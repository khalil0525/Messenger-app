const Sequelize = require("sequelize");
require("dotenv").config();

// const db = new Sequelize({
//   database: process.env.DB_DATABASE,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: "postgres",
//   dialectOptions:
//     process.env.env === "development"
//       ? null
//       : {
//           ssl: {
//             require: true, // This will help you. But you will see nwe error
//             rejectUnauthorized: false, // This line will fix new error
//           },
//         },
// });

const db = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
module.exports = db;
