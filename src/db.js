const mysql2 = require("mysql2/promise");
require("dotenv").config();

const getConnection = async () => {
  return await mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
};

module.exports = { getConnection };
