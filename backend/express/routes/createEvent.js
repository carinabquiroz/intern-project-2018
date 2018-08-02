import express from 'express';
import verifyToken from '../auth/authorizeUser';

import db from '../db';

var router = express.Router();

router.post('/', verifyToken, (req, res) => {
  db.user.findOne({ where: { id: req.userId } })
    .then(user => {
      db.event.create({
        creator: user.username,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        attendees: [user.username],
      });
    });
  res.end();
});

module.exports = router;
