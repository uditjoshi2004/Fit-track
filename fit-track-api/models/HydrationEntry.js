const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hydrationEntrySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    volumeInMl: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, { timestamps: true });

// Prevents duplicate entries for the same user on the same day.
hydrationEntrySchema.index({ user: 1, date: 1 }, { unique: true });

const HydrationEntry = mongoose.model('HydrationEntry', hydrationEntrySchema);

module.exports = HydrationEntry;