import express from 'express';
import verifyToken from '../auth/authorizeUser';
import Lodash from 'lodash'
import Sequelize from 'sequelize';
import db from '../db';

var router = express.Router();

router.post('/', verifyToken, (req, res) => {
  db.event.findOne({ where: { id: req.body.eventId }})
    .then(event => {
      const newAttendees = Lodash.without(event.attendees, req.username)
      event.update({attendees: newAttendees})
        .then(() => {
          db.user.findOne({ where: {id: req.userId } })
          .then(user => {
            const newEvents = Lodash.without(user.events, parseInt(req.body.eventId))
            user.update({events: newEvents})
          })
          .then(() => res.end())
        })
    })
});

module.exports = router;
