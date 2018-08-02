import express from 'express';
var router = express.Router();

import db from '../db';

router.get('/', (req, res, next) => {
  db.event.findAll()
    .then(events => {
      res.json(events).end();
    });
});

module.exports = router;
