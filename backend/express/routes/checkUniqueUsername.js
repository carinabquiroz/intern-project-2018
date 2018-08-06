import express from 'express';
var router = express.Router();

import db from '../db';

router.post('/', (req, res, next) => {
  db.user.findOne({ where: { username: req.body.username }})
    .then(user => {
      console.log(user);
      if (user) {
        res.json({isUnique: false}).end();
      } else {
        res.json({isUnique: true}).end();
      }
    });
});

module.exports = router;
