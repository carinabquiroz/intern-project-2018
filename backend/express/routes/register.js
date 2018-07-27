import storeUser from '../utils/storeUser';
import express from 'express';
var router = express.Router();

router.post('/', (req, res) => {
  console.log('Adding user to db');
  storeUser(req.body);
  res.end();
});

module.exports = router;
