const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    const uid = req.query.uid || 'default-user';
    const payload = {
        iss: "coze",
        aud: "coze",
        exp: Math.floor(Date.now() / 1000) + 3600,
        session_name: uid
    };
    // 这里的 COZE_CLIENT_SECRET 会在 Vercel 后台配置
    const token = jwt.sign(payload, process.env.COZE_CLIENT_SECRET, { algorithm: 'HS256' });
    
    res.status(200).json({ token });
};
