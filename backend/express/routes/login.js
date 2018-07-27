import login from '../utils/login';
import db from '../db';
import bcrypt from 'bcrypt';
import express from 'express';

var router = express.Router();

router.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.user.findAll({ where: { username: username } })
    .then((data) => {
      if (data.length == 0) {
        console.log('data length was 0');
        res.write(JSON.stringify({ loggedIn: false }));
        res.end();
      } else {
        console.log(data);
        res.write(JSON.stringify({ loggedIn: bcrypt.compareSync(password, data[0].hash) }));
        res.end();
      };
    });
});

module.exports = router;
