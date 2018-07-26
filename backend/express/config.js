import { each } from 'lodash';
require('dotenv').config()

const Config = {
  database_url: process.env.DATABASE_URL || '',
};

// each(Config, (value, key) => {
//   if (value === '') throw new Error(`${key} in config undefined.`);
// });

export default Config;
