const requireAuth = (req, res, next) => {
    if(req.isAuthenticated) {
        next();
    }
    return res.status(403).json({
        code: '401',
        message: 'Unauthenticated'
    })
};

module.exports = requireAuth;