import Sequelize from 'sequelize';

export default {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  creator: { type: Sequelize.STRING, allowNull: false },
  title: { type: Sequelize.TEXT, allowNull: false},
  description: { type: Sequelize.TEXT, allowNull: false},
  date: { type: Sequelize.DATEONLY, allowNull: false},
  time: { type: Sequelize.TIME, allowNull: false},
  location: { type: Sequelize.TEXT, allowNull: false},
  attendees: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false},
  tags: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false},
};
