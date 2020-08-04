const db = require("../db");

const findUserByEmail = function (email) {
  return db.query(
    `
    SELECT *
    FROM users
    WHERE email = $1;
  `, [email]
  ).then((results) => {
    return results.rows[0];
  });
};

module.exports = {
  findUserByEmail
};

