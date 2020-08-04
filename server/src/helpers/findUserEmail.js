const db = require("../db");

const findUserEmail = function (email) {
  return db.query(
    `
    SELECT *
    FROM users
    WHERE email = $1;
  `, [email]
  ).then((results) => {
    if (results.rows.length >= 1) {
      throw new Error("Email already registered");
    }
  });
};

module.exports = {
  findUserEmail
};

