const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  // 设置 CORS 允许任意源访问
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  try {
    const secret = process.env.COZE_CLIENT_SECRET;
    
    // 检查密钥是否配置
    if (!secret) {
      return res.status(500).json({ error: "环境变量 COZE_CLIENT_SECRET 未配置" });
    }

    const uid = req.query.uid || 'default-user';
    const payload = {
      iss: "coze",
      aud: "coze",
      exp: Math.floor(Date.now() / 1000) + 3600,
      session_name: uid
    };
    
    const token = jwt.sign(payload, secret, { algorithm: 'HS256' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
