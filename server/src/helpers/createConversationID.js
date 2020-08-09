const db = require("../db");

const createConversationID = function (senderID, receiverID) {
  return db.query(
    `
    SELECT id
    FROM conversations
    WHERE (user_one = $1 OR user_one = $2)
    AND (user_two = $1 OR user_two = $2);
  `, [senderID, receiverID]
  ).then((results) => {
    if (results.length >= 1) {
      return results.rows[0].id;
    } else {
      db.query(
        `
        INSERT INTO conversations(user_one, user_two)
        VALUES ($1, $2);
      `, [senderID, receiverID]
      );
      return db.query(
        `
        SELECT id
        FROM conversations
        WHERE (user_one = $1 OR user_one = $2)
        AND (user_two = $1 OR user_two = $2);
      `, [senderID, receiverID]
      ).then((results) => {
        return results.rows[0].id;
      }
      );
    }
  });
};

module.exports = {
  createConversationID
};
