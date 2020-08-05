const db = require("../db");

const findUserCoordinates = function (email) {
  return db.query(
    `
    SELECT coordinates
    FROM users
    WHERE email = $1;
  `, [email]
  ).then((results) => {
    return results.rows[0];
  });
};

module.exports = {
  findUserCoordinates
};

