const Sequelize = require("sequelize");
const db = require("../db");

const Friend = db.define("friend", {
  user1id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  user2id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Message;
