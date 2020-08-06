const router = require("express").Router();
const { groupBy } = require("../helpers/groupby");

module.exports = db => {
  //Shows all messages. Using this route for testing, can be removed when ready for production
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT *
      FROM messages;
    `
    ).then(({ rows: messages }) => {
      response.json(messages);
    });
  });

  router.get("/userMessages", (request, response) => {
    db.query(
      `
        SELECT conversations.*, messages.sender_id, messages.receiver_id, messages.message_text, messages.time_sent
        FROM conversations
        JOIN messages ON conversations.id = messages.conversation_id
        WHERE (messages.sender_id = $1 OR messages.receiver_id = $1);
        `, [request.session["user_id"]])
      .then(({ rows: messages }) => {
        const result = groupBy(messages, 'id');
        return response.json(result);
      });
  });

  return router;
};
