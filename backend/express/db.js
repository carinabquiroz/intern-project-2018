import Sequelize from 'sequelize';
import { forEach } from 'lodash';

import Config from './config';
import models from './models';

const sequelize = new Sequelize(Config.database_url);
const db = {};

forEach(models, (model, name) => {
  db[name] = sequelize.define(name, model);
});

export default db;
