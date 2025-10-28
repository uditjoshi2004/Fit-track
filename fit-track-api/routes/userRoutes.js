const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const mongoose = require('mongoose');
const generateToken = require('../utils/generateToken');
const { protect } = require('../middleware/authMiddleware');
const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const Activity = require('../models/ActivityModel');
const WeightEntry = require('../models/WeightEntry');
const ACHIEVEMENTS = require('../config/achievements');
const { startOfDay, endOfDay } = require('date-fns');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { generateDailyBriefing, getFollowUpAnswer } = require('../services/aiAnalystService');
const { isToday } = require('date-fns');

// NOTE: The incorrect userSchema that was here has been removed.

// @desc    Get all achievements and the user's current status for them
// @route   GET /api/users/achievements
// @access  Private
router.get('/achievements', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get today's activity to check for daily achievements
    const today = new Date();
    const todaysActivity = await Activity.findOne({
      user: req.user.id,
      date: { $gte: startOfDay(today), $lte: endOfDay(today) }
    });

    const userEarnedBadges = new Map(user.achievements.map(a => [a.badgeId, a]));

    // Combine static achievement data with dynamic user progress
    const achievementStatus = ACHIEVEMENTS.map(achievement => {
      let isEarnedToday = false;
      let dateEarned = null;

      if (achievement.type === 'daily') {
        // Check if today's activity meets the condition for this daily badge
        if (todaysActivity && todaysActivity[achievement.metric] >= achievement.condition.value) {
          isEarnedToday = true;
        }
      } else if (achievement.type === 'persistent') {
        // Check if the user has this persistent badge saved in their profile
        if (userEarnedBadges.has(achievement.id)) {
          dateEarned = userEarnedBadges.get(achievement.id).dateEarned;
        }
      }

      return {
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        type: achievement.type,
        isEarnedToday,
        dateEarned
      };
    });

    res.json(achievementStatus);

  } catch (error) {
    console.error('Error fetching achievement status:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/users/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      // Check if user exists with Google provider
      if (userExists.provider === 'google') {
        return res.status(400).json({
          message: 'Account already exists with Google. Please use "Continue with Google" to sign in.',
          provider: 'google'
        });
      } else {
        return res.status(400).json({ message: 'User already exists' });
      }
    }

    const user = await User.create({ name, email, password, provider: 'email' });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        provider: user.provider,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/users/check-email
// @desc    Check email status for unified auth flow
router.post('/check-email', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      // Email doesn't exist - new user
      return res.json({
        exists: false,
        hasPassword: false,
        provider: null
      });
    }

    // Email exists - check if it has a password
    const hasPassword = !!user.password;

    res.json({
      exists: true,
      hasPassword: hasPassword,
      provider: user.provider || 'email'
    });
  } catch (error) {
    console.error('Email check error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // --- 2FA LOGIC ---
      if (user.isTwoFactorEnabled) {
        // If 2FA is enabled, don't send the token yet.
        // Send a temporary response indicating that a 2FA code is needed.
        res.json({
          _id: user._id, // We need the user ID for the next step
          twoFactorRequired: true,
        });
      } else {
        // 2FA is not enabled, so log the user in as normal.
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
          token: generateToken(user._id),
        });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/users/profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json({
        ...user.toObject(),
        isGoogleFitConnected: !!user.googleFitRefreshToken
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/users/profile/bmi-data
// @desc    Get user's BMI data based on height and latest weight entry
// @access  Private
router.get('/profile/bmi-data', protect, async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the user's height
    const user = await User.findById(userId).select('height');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the user's most recent weight entry
    const latestWeightEntry = await WeightEntry.findOne({ user: userId })
      .sort({ date: -1 })
      .select('weightInKg');

    // Check if both height and weight exist
    if (!user.height || !latestWeightEntry) {
      return res.status(400).json({
        message: 'Height or weight data not available',
        height: user.height || null,
        latestWeight: latestWeightEntry?.weightInKg || null
      });
    }

    // Calculate BMI: BMI = weight(kg) / height(m)²
    const heightInMeters = user.height / 100; // Convert cm to meters
    const bmi = latestWeightEntry.weightInKg / (heightInMeters * heightInMeters);

    // Determine BMI category
    let category;
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }

    res.json({
      height: user.height,
      latestWeight: latestWeightEntry.weightInKg,
      bmi: Math.round(bmi * 10) / 10, // Round to 1 decimal place
      category: category
    });

  } catch (error) {
    console.error('Error fetching BMI data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// @route   POST /api/users/google
router.post('/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();
    let user = await User.findOne({ email });

    if (!user) {
      // New user - create account
      user = await User.create({ name, email, provider: 'google', avatarUrl: picture });
    } else {
      // Existing user - update avatar and potentially link accounts
      user.avatarUrl = picture;

      // If user was created with email but now signing in with Google, link the accounts
      if (user.provider === 'email') {
        user.provider = 'google'; // Link the account to Google
        // Keep the password in case they want to use email login later
      }

      await user.save();
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      provider: user.provider,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(400).json({ message: 'Google authentication failed' });
  }
});

// @route   POST /api/users/forgotpassword
// @desc    Request a password reset link
router.post('/forgotpassword', async (req, res) => {
  const { email } = req.body;

  // Validate email input
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // Security best practice: Don't reveal if an email is registered or not.
      return res.status(200).json({ success: true, message: 'If an account with that email exists, a password reset link has been sent.' });
    }

    // Check if user has a password (not Google-only account)
    if (!user.password) {
      return res.status(400).json({
        message: 'This account was created with Google. Please use "Continue with Google" to sign in.',
        provider: 'google'
      });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration missing. Please set EMAIL_USER and EMAIL_PASS environment variables.');
      return res.status(500).json({
        message: 'Email service not configured. Please contact support.'
      });
    }

    const resetUrl = `http://localhost:4200/auth/reset-password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested to reset your password. Please click the following link to complete the process:\n\n${resetUrl}\n\nThis link will expire in 10 minutes.\n\nIf you did not request this password reset, please ignore this email.`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Fit-Track Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Password Reset Request - Fit-Track',
      text: message,
    });

    res.status(200).json({ success: true, message: 'Password reset link has been sent to your email.' });
  } catch (error) {
    console.error('Forgot password error:', error);

    // Ensure tokens are cleared on failure so user can try again
    try {
      const user = await User.findOne({ email });
      if (user) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
      }
    } catch (cleanupError) {
      console.error('Error cleaning up reset tokens:', cleanupError);
    }

    res.status(500).json({ message: "Unable to send password reset email. Please try again later." });
  }
});

// @route   PUT /api/users/resetpassword/:resettoken
// @desc    Reset user's password
router.put('/resetpassword/:resettoken', async (req, res) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, data: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/goals
// @desc    Get the logged-in user's goals
// @access  Private
router.get('/goals', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.goals);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/users/goals
// @desc    Update the logged-in user's goals
// @access  Private
router.put('/goals', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update goals with the data from the request body
    user.goals = req.body || user.goals;
    const updatedUser = await user.save();

    res.json(updatedUser.goals);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/users/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.height = req.body.height || user.height;
      user.weight = req.body.weight || user.weight;

      const updatedUser = await user.save();
      // Send back the full updated user object
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/users/password
// @desc    Change user password
// @access  Private
router.put('/password', protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (user && (await user.matchPassword(currentPassword))) {
      user.password = newPassword;
      await user.save();
      res.json({ message: 'Password updated successfully' });
    } else {
      res.status(401).json({ message: 'Invalid current password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/google-fit/intraday
// @desc    Get intraday (hourly) data for a specific metric
// @access  Private
router.get('/intraday', protect, async (req, res) => {
  const { date, type } = req.query; // e.g., date='2025-09-30', type='steps'

  try {
    const user = await User.findById(req.user._id);
    if (!user || !user.googleFitRefreshToken) {
      return res.status(400).json({ message: 'Google Fit not connected.' });
    }

    oauth2Client.setCredentials({ refresh_token: user.googleFitRefreshToken });
    const fitness = google.fitness({ version: 'v1', auth: oauth2Client });

    // Determine the correct dataTypeName based on the 'type' query
    let dataTypeName;
    switch (type) {
      case 'steps':
        dataTypeName = 'com.google.step_count.delta';
        break;
      case 'calories':
        dataTypeName = 'com.google.calories.expended';
        break;
      // Add other cases for active minutes, etc. later
      default:
        return res.status(400).json({ message: 'Invalid data type requested.' });
    }

    // Calculate the start and end of the requested day in the user's timezone
    const targetDate = new Date(date);
    const startTime = startOfDay(targetDate, { timeZone: userTimezone });
    const endTime = endOfDay(targetDate, { timeZone: userTimezone });

    // Make the request to Google Fit for hourly data
    const response = await fitness.users.dataset.aggregate({
      userId: 'me',
      requestBody: {
        aggregateBy: [{ dataTypeName }],
        bucketByTime: { durationMillis: 3600000 }, // 3600000ms = 1 hour
        startTimeMillis: startTime.getTime(),
        endTimeMillis: endTime.getTime(),
      },
    });

    // Process the hourly buckets into a clean array
    const hourlyData = response.data.bucket.map(bucket => {
      const value = bucket.dataset[0].point[0]?.value[0]?.fpVal || bucket.dataset[0].point[0]?.value[0]?.intVal || 0;
      return {
        time: new Date(parseInt(bucket.startTimeMillis)).getHours(), // Hour of the day (0-23)
        value: Math.round(value)
      };
    });

    res.json(hourlyData);

  } catch (error) {
    console.error(`Error fetching intraday data for ${type}:`, error.message);
    res.status(500).json({ message: 'Failed to fetch detailed data' });
  }
});

// @desc    Generate a 2FA secret and QR code for the user
// @route   POST /api/users/2fa/generate
// @access  Private
router.post('/2fa/generate', protect, async (req, res) => {
  try {
    // Generate a new secret object for the user
    const secret = speakeasy.generateSecret({
      name: `Fit-Track (${req.user.email})`, // This name appears in the authenticator app
    });

    // Find the user and save the secret to their profile
    const user = await User.findById(req.user.id);
    user.twoFactorSecret = secret.base32; // Store the secret in a format computers can read
    await user.save();

    // Generate a QR code image from the secret
    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
      if (err) {
        throw new Error('Could not generate QR code.');
      }
      // Send the QR code image data back to the frontend
      res.json({
        qrCodeUrl: data_url,
      });
    });
  } catch (error) {
    console.error('2FA generate secret error:', error);
    res.status(500).json({ message: 'Error generating 2FA secret' });
  }
});

// @desc    Verify a 2FA token and enable 2FA for the user
// @route   POST /api/users/2fa/verify
// @access  Private
router.post('/2fa/verify', protect, async (req, res) => {
  const { token } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user.twoFactorSecret) {
      return res.status(400).json({ message: '2FA secret not found. Please try setup again.' });
    }

    const isVerified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token,
    });

    if (isVerified) {
      user.isTwoFactorEnabled = true;
      await user.save();
      res.json({ message: '2FA has been enabled successfully.' });
    } else {
      res.status(400).json({ message: 'Invalid 2FA token. Please try again.' });
    }
  } catch (error) {
    console.error('2FA verification error:', error);
    res.status(500).json({ message: 'Error verifying 2FA token' });
  }
});

// @desc    Verify a 2FA token during login and grant access
// @route   POST /api/users/2fa/login
// @access  Public
router.post('/2fa/login', async (req, res) => {
  const { userId, token } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Verify the token the user provided
    const isVerified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token,
    });

    if (isVerified) {
      // Token is correct, now we can grant the final login token (JWT)
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        token: generateToken(user._id),
      });
    } else {
      // Token is incorrect
      res.status(401).json({ message: 'Invalid 2FA code.' });
    }
  } catch (error) {
    console.error('2FA login error:', error);
    res.status(500).json({ message: 'Error during 2FA login' });
  }
});

// @desc    Disable 2FA for the user
// @route   POST /api/users/2fa/disable
// @access  Private
router.post('/2fa/disable', protect, async (req, res) => {
  const { token } = req.body;

  try {
    const user = await User.findById(req.user.id);

    // First, verify the token is valid
    const isVerified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token,
    });

    if (isVerified) {
      // If valid, disable 2FA and clear the secret
      user.isTwoFactorEnabled = false;
      user.twoFactorSecret = undefined;
      await user.save();

      // Send back the updated user profile so the frontend can update its state
      const updatedUser = await User.findById(req.user.id).select('-password');
      res.json(updatedUser);
    } else {
      res.status(400).json({ message: 'Invalid 2FA token.' });
    }
  } catch (error) {
    console.error('2FA disable error:', error);
    res.status(500).json({ message: 'Error disabling 2FA' });
  }
});

// @desc    Get the AI-generated daily briefing for the user
// @route   GET /api/users/ai/daily-briefing
// @access  Private
router.get('/ai/daily-briefing', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if a valid briefing for today already exists in the cache
    if (user.dailyBriefing && user.dailyBriefing.text && isToday(new Date(user.dailyBriefing.date))) {
      return res.json({ briefing: user.dailyBriefing.text });
    }

    // If no valid cache, generate a new briefing
    const newBriefingText = await generateDailyBriefing(user);

    // Save the new briefing to the user's profile for caching
    user.dailyBriefing = {
      text: newBriefingText,
      date: new Date()
    };
    await user.save();

    // Send the new briefing to the frontend
    res.json({ briefing: newBriefingText });

  } catch (error) {
    console.error('Error fetching daily briefing:', error);
    res.status(500).json({ message: 'Error generating daily briefing' });
  }
});

// @desc    Ask a follow-up question to the AI
// @route   POST /api/users/ai/ask
// @access  Private
router.post('/ai/ask', protect, async (req, res) => {
  try {
    const { question } = req.body;
    const user = req.user;

    if (!question || question.trim().length === 0) {
      return res.status(400).json({ message: 'Question is required' });
    }

    const answer = await getFollowUpAnswer(user, question.trim());
    res.json({ answer });

  } catch (error) {
    console.error('Error processing follow-up question:', error);
    res.status(500).json({ message: 'Error processing your question' });
  }
});

module.exports = router;