import Sequelize from 'sequelize';

export default {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: Sequelize.STRING, allowNull: false },
  hash: { type: Sequelize.STRING, allowNull: false},
  events: { type: Sequelize.ARRAY(Sequelize.INTEGER), allowNull: true},
  hosting: { type: Sequelize.ARRAY(Sequelize.INTEGER), allowNull: true}
};
