import express from 'express';
var router = express.Router();

router.post('/', (req, res) => {
  console.log('Creating Event');
  console.log(req.body)
  res.end();
});

module.exports = router;
