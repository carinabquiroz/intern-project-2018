import express from 'express';
import verifyToken from '../auth/authorizeUser';
import Sequelize from 'sequelize';

var router = express.Router();

import db from '../db';

router.get('/', verifyToken, (req, res) => {
  db.user.findOne({ where: { id: req.userId } })
    .then(user => {
      db.event.findAll({ where: {id: {[Sequelize.Op.or]: user.events } } })
      .then(attending => {
        db.event.findAll({ where: {id: {[Sequelize.Op.or]: user.hosting } } })
        .then(hosting => {
          res.json({attending, hosting}).end();
        })
      });
    });
});

module.exports = router;
