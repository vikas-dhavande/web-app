const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        enum: ['Admin', 'Patient', 'Doctor', 'Hospital', 'Lab', 'Pharmacy'],
        default: ['Patient'],
    },
    profileStatus: {
        type: String,
        enum: ['new', 'incomplete', 'under_review', 'verified', 'rejected'],
        default: 'new'
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
    metadata: {
        // Stores IDs for specific roles (e.g., doctorId, hospitalId)
        moduleId: { type: mongoose.Schema.Types.ObjectId },
        additionalInfo: { type: Map, of: String }
    }
}, {
    timestamps: true,
});

// Password Hashing Middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare Password Methods
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
