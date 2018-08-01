import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import db from '../db';

var router = express.Router();

router.post('/', (req, res) => {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

  db.user.create({
    username: req.body.username,
    hash: hashedPassword,
  })
  .then(user => {
      var token = jwt.sign({ id: user.id }, process.env.FAKE_SECRET);
      res.status(200).send({ auth: true, token: token });
    }
  )
  .catch(err => res.status(500).send('There was a problem registering the user'));
});

module.exports = router;
