const jwt = require('jsonwebtoken');
const { isTokenValid } = require('../utilities/jwt');

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: insufficient permissions' });
        }
        next();
    };
};

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Authentication invalid' });
    }

    try {
        const payload = isTokenValid({ token });
        req.user = {
            userId: payload.userId,
            name: payload.name,
            email: payload.email,
            role: payload.role
        };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = {
    authenticateUser,
    authorizeRoles
};
