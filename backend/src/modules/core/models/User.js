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
    role: {
        type: String,
        enum: ['Admin', 'Doctor', 'HospitalAdmin', 'PharmaVendor', 'CollegeAdmin', 'User'],
        default: 'User',
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
