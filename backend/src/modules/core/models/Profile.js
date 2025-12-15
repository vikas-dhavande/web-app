const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    photoUrl: {
        type: String
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String
    },
    completionStatus: {
        type: Number, // Percentage of completion
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
