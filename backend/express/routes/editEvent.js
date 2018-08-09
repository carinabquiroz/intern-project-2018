import express from 'express';
import verifyToken from '../auth/authorizeUser';
import db from '../db';

var router = express.Router();

router.post('/', verifyToken, (req, res) => {
  db.event.findOne({ where: { id: req.body.id } })
    .then(event => {
      event.update({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
      })
      .then(() => res.end())
    })
});

module.exports = router;
