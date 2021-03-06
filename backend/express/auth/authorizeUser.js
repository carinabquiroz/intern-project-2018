import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
  try {
    const decoded = jwt.verify(token, process.env.FAKE_SECRET);
    req.userId = decoded.id;
    req.username = decoded.username;
  } catch (error) {
    return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });
  }

  next();
};

module.exports = verifyToken;
