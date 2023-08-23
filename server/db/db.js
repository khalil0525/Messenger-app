const Sequelize = require("sequelize");
require("dotenv").config();

const db =
  process.env === "development"
    ? new Sequelize({
        database: process.env.DB_DATABASE,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true, // This will help you. But you will see nwe error
            rejectUnauthorized: false, // This line will fix new error
          },
        },
      })
    : new Sequelize({
        database: process.env.DB_DATABASE,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
      });

module.exports = db;
