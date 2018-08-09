import express from 'express';
import jwt from 'jsonwebtoken';

var router = express.Router();

import db from '../db';

router.get('/', (req, res, next) => {
  db.event.findAll({order: [['id', 'DESC']]})
  .then(events => {
    const token = req.headers['x-access-token'];
    try {
      const decoded = jwt.verify(token, process.env.FAKE_SECRET);
      db.user.findOne({ where: { id: decoded.id } })
      .then(user => {
        res.json({
          events,
          hosting: user.hosting,
          attending: user.events
        }).end();
      })
    } catch (error) {
      res.json({
        events,
        hosting: [],
        attending: []
      }).end();
    }
  });
});

module.exports = router;
