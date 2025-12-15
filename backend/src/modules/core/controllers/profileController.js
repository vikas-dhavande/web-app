// MOCK DB MODE ENABLED
const User = require('../models/UserMock');
const Profile = require('../models/ProfileMock');
const Verification = require('../models/VerificationMock');

// @desc    Get current user profile
// @route   GET /api/profile/me
// @access  Private
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        let profile = await Profile.findOne({ user: req.user.id });

        if (!profile) {
            // Create empty profile if not exists
            profile = await Profile.create({ user: req.user.id, fullName: user.name });
        }

        const verifications = await Verification.find({ user: req.user.id });

        res.json({
            user,
            profile,
            verifications
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update basic profile
// @route   PUT /api/profile/update
// @access  Private
exports.updateProfile = async (req, res) => {
    const { fullName, phoneNumber, address, photoUrl } = req.body;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (!profile) {
            profile = new Profile({ user: req.user.id });
        }

        if (fullName) profile.fullName = fullName;
        if (phoneNumber) profile.phoneNumber = phoneNumber;
        if (photoUrl) profile.photoUrl = photoUrl;
        if (address) profile.address = address;

        // Simple completeness calculation
        let filledFields = 0;
        const totalFields = 4; // Name, Phone, Photo, Address
        if (profile.fullName) filledFields++;
        if (profile.phoneNumber) filledFields++;
        if (profile.photoUrl) filledFields++;
        if (profile.address && profile.address.city) filledFields++;

        profile.completionStatus = (filledFields / totalFields) * 100;

        await profile.save();

        // Also update user name if changed
        if (fullName) {
            await User.findByIdAndUpdate(req.user.id, { name: fullName });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Submit verification for a role
// @route   POST /api/profile/verify/:role
// @access  Private
exports.submitVerification = async (req, res) => {
    const { role } = req.params;
    const { data, documents } = req.body;

    if (!['Doctor', 'Hospital', 'Lab', 'Pharmacy'].includes(role)) {
        return res.status(400).json({ msg: 'Invalid role for verification' });
    }

    try {
        // Update user roles if not already present
        const user = await User.findById(req.user.id);
        if (!user.roles.includes(role)) {
            user.roles.push(role);
        }
        user.profileStatus = 'under_review';
        await user.save();

        // Create or Update Verification
        let verification = await Verification.findOne({ user: req.user.id, role });

        if (verification) {
            verification.data = data;
            verification.documents = documents;
            verification.status = 'review';
        } else {
            verification = new Verification({
                user: req.user.id,
                role,
                data,
                documents,
                status: 'review'
            });
        }

        await verification.save();

        res.json(verification);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
