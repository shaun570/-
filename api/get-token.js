const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  // 允许跨域请求（重要）
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const uid = req.query.uid || 'default-user';
  const payload = {
    iss: "coze",
    aud: "coze",
    exp: Math.floor(Date.now() / 1000) + 3600,
    session_name: uid
  };
  
  // 使用你在Vercel设置的环境变量
  const token = jwt.sign(payload, process.env.COZE_CLIENT_SECRET, { algorithm: 'HS256' });
  res.status(200).json({ token });
};
