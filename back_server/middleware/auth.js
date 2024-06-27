// middleware/auth.js
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user_id) {
        return next();
    } else {
        return res.status(401).json({ status: 401, message: 'Unauthorized' });
    }
}

module.exports = isAuthenticated;
