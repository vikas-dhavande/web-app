const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        enum: ['Doctor', 'Hospital', 'Lab', 'Pharmacy'],
        required: true
    },
    status: {
        type: String,
        enum: ['submitted', 'review', 'verified', 'rejected'],
        default: 'submitted'
    },
    data: {
        type: mongoose.Schema.Types.Mixed, // Flexible structure for different role forms
        required: true
    },
    documents: [{
        name: String,
        url: String,
        type: String // e.g., 'degree', 'license'
    }],
    adminComments: {
        type: String
    },
    verifiedAt: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Verification', verificationSchema);
