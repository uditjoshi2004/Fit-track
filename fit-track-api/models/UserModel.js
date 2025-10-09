const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: function () { return this.provider === 'email'; } }, // Only required for email signups
  provider: { type: String, default: 'email', enum: ['email', 'google'] }, // Track signup method
  avatarUrl: { type: String }, 

  // Fields for 2FA
  isTwoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: { type: String },

  height: { type: Number, default: 0 }, // in cm
  weight: { type: Number, default: 0 }, // in kg

  dailyBriefing: {
    text: String,
    date: Date
  },
  
  googleFitRefreshToken: String,

  // new goals object
  goals: {
    steps: { type: Number, default: 10000 },
    caloriesBurned: { type: Number, default: 500 },
    activeMinutes: { type: Number, default: 60 },
    sleepHours: { type: Number, default: 7.5 },
  },
  achievements: [{
    badgeId: String,
    name: String,
    description: String,
    dateEarned: Date,
  }], // <-- Add this array
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true });


// Method to compare entered password with hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it was modified and actually exists.
  // This prevents re-hashing on unrelated updates (e.g., updating avatar)
  // and supports OAuth users who may not have a password set.
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;