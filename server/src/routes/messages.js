const router = require("express").Router();
const { groupBy } = require("../helpers/groupby");

module.exports = db => {
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



// router.get("/userMessages", (request, response) => {
//   db.query(
//     `
//     SELECT *
//     FROM messages
//     WHERE (sender_id = $1 OR receiver_id = $1)
//     ORDER BY conversation_id;

//   `, [request.session["user_id"]])
//     .then(({ rows: messages }) => {

//       const messageIDs = messages.map(message => message.conversation_id);

//       console.log(messages[0].conversation_id);

//       console.log(messageIDs);

//       //get all the conversation ids
//       //separate the messages by conversation id
//       //map over and filter 
//       return response.json(messages);
//     });
// });
