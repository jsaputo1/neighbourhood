const db = require("../db");

const findUserByID = function (userID) {
  return db.query(
    `
    SELECT *
    FROM users
    WHERE id = $1;
  `, [userID]
  ).then((results) => {
    return results.rows[0];
  });
};

module.exports = {
  findUserByID
};
