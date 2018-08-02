import express from 'express';
import jwt from 'jsonwebtoken';

var router = express.Router();

router.post('/', (req, res) => {
  const token = req.body.token;
  try {
    const decoded = jwt.verify(token, process.env.FAKE_SECRET);
    res.send({ auth: true });
  } catch (error) {
    res.send({ auth: false });
  }
});

module.exports = router;
