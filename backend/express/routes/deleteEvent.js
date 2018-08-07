import express from 'express';
import verifyToken from '../auth/authorizeUser';
import Lodash from 'lodash'
import Sequelize from 'sequelize'
var router = express.Router();

import db from '../db';

router.post('/', verifyToken, (req, res) => {
  db.event.findOne({ where: { id: req.body.eventId }})
    .then(event => {
      const attendees = event.attendees
      event.destroy()
      return attendees
    })
      .then(userIds => {
        db.user.findAll({ where: {id : {[Sequelize.Op.in]: userIds } } })
          .then(users => {
            users.forEach(user => {
              const newEvents = Lodash.without(user.events, parseInt(req.body.eventId))
              user.update({events: newEvents})
            })
          })
          .then(()=> {
            db.user.findOne({ where: {id: req.userId } })
              .then(creator => {
                const newHosting = Lodash.without(creator.hosting, parseInt(req.body.eventId))
                creator.update({hosting: newHosting})
                  .then(() => res.end())
              })
          })
      });
});

module.exports = router;
