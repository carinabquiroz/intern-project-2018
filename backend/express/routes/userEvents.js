import express from 'express';
import verifyToken from '../auth/authorizeUser';
var router = express.Router();

import db from '../db';

router.get('/', verifyToken, (req, res) => {
  db.user.findOne({ where: { id: req.userId } })
    .then(user => {
      res.json({attending: user.events, hosting: user.hosting}).end();
    });
});

module.exports = router;
