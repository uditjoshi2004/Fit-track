const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weightEntrySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    weightInKg: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, { timestamps: true });

// To prevent a user from having multiple entries on the same day,
// we create a compound index.
weightEntrySchema.index({ user: 1, date: 1 }, { unique: true });

const WeightEntry = mongoose.model('WeightEntry', weightEntrySchema);

module.exports = WeightEntry;