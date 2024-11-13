exports.isAuthenticated = (req, res, next) => {
    if (!req.session.user_id) {
        return res.status(401).json({ error: '로그인 상태가 아닙니다.' });
    }
    next();
};
