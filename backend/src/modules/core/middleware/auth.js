const jwt = require('jsonwebtoken');
const { users } = require('../../../config/appwrite');

/**
 * Appwrite Auth Middleware
 * Verifies JWT and attaches Appwrite user object to request
 */
const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify JWT (using Appwrite user ID from decoded token)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user from Appwrite
            const appwriteUser = await users.get(decoded.id);

            if (!appwriteUser) {
                return res.status(401).json({ message: 'User not found in Appwrite' });
            }

            req.user = appwriteUser;
            next();
        } catch (error) {
            console.error('Auth Middleware Error:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = protect;
