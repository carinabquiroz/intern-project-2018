import db from '../db';
import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';

var router = express.Router();

router.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.user.findOne({ where: { username: username } })
  .then(user => {
    if (!user) return res.status(401).send({ auth: false, token: null });
    const passwordIsValid = bcrypt.compareSync(password, user.hash);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.FAKE_SECRET);
    res.status(200).send({ auth: true, token: token });
  })
  .catch(err => {
    res.status(500).send('Error on the server');
  });
});

module.exports = router;
