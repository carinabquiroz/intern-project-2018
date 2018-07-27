import express from 'express';
import verifyToken from '../auth/authorizeUser';

var router = express.Router();

router.post('/', verifyToken, (req, res) => {
  console.log('Creating Event');
  console.log(req.body);
  res.end();
});

module.exports = router;
