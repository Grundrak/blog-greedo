const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  try {
    // Extract token from Authorization header or query parameter
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.query.token;

    if (!token) {
      throw new Error('Authorization token is required');
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Attach user information to request context
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = verifyToken;
