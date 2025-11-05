const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
    // 1. Get the token from the request header
    const token = req.header('x-auth-token');

    // 2. If no token, deny access
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // 3. If there is a token, verify it
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Add the user's info (from the token payload) to the request object
        req.user = decoded.user;
        next(); // Move on to the next function (the route handler)
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};