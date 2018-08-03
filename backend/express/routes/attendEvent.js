import express from 'express';
import verifyToken from '../auth/authorizeUser';
import Sequelize from 'sequelize';
import db from '../db';

var router = express.Router();

router.post('/', verifyToken, (req, res) => {
  db.event.update(
    { attendees: Sequelize.fn('array_append', Sequelize.col('attendees'), req.username) },
    { where: { id: req.body.eventId } })
  .then((eventAffected) => {
    db.user.update(
      { events: Sequelize.fn('array_append', Sequelize.col('events'), req.body.eventId) },
      { where: { id: req.userId } })
      .then((userAffected) => {
        res.end();
      });
  });
});

module.exports = router;
