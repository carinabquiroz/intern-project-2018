import storeUser from '../utils/storeUser';
import express from 'express';
var router = express.Router();


/* GET users listing. */
router.get('/', (req, res, next) => {
  // res.send('respond with a resource');
  res.json([{
    id: 1,
    username: 'samsepi0l',
  }, {
    id: 2,
    username: 'D0loresH4ze',
  },
]);
});

router.post('/', (req, res) => {
  console.log('Adding user to db');
  storeUser(req.body);
  res.end();
});

module.exports = router;
