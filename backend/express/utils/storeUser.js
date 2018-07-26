import db from '../db';
import bcrypt from 'bcrypt';

const storeUser = (user) => {
  const username = user.username;
  const password = user.password;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds)
    .then((hash) => {
      db.user.create({
        'username': username,
        'hash': hash
      });
    });
};

export default storeUser;
