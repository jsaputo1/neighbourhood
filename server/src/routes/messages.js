const router = require("express").Router();
const { groupBy } = require("../helpers/groupby");
const { createConversationID } = require("../helpers/createConversationID");
const { findUserByID } = require("../helpers/findUserByID");

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

  //shows all conversations. can delete when ready for production
  router.get("/conversations", (request, response) => {
    db.query(
      `
      SELECT *
      FROM conversations;
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

  router.post("/reply", (request, response) => {
    // console.log('Request Body', request.body);
    values = [
      request.body.conversation_id,
      request.session.user_id,
      request.body.receiver_id,
      request.body.message
    ];
    db.query(
      `
      INSERT INTO messages(conversation_id, sender_id, receiver_id, message_text)
      VALUES ($1, $2, $3, $4);

        `, values)
      .then(() => {
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
  });

  router.post("/newMessage", (request, response) => {
    createConversationID(request.session.user_id, request.body.receiver_id)
      .then((conversationID) => {
        values = [
          conversationID,
          request.session.user_id,
          request.body.receiver_id,
          request.body.message,
        ];
        db.query(
          `
          INSERT INTO messages(conversation_id, sender_id, receiver_id, message_text)
          VALUES ($1, $2, $3, $4);
        `, values)
          .then((data) => {
            return response.status(200).json(data).end;
          });
      });
  });

  router.get("/conversation", (request, response) => {
    // console.log("Request Query:", request.query);
    // console.log("Request Session ID", request.session.user_id);
    // console.log("Request Body", request.body);
    db.query(
      `
        SELECT conversations.*, messages.sender_id, messages.receiver_id, messages.message_text, messages.time_sent
        FROM conversations
        JOIN messages ON conversations.id = messages.conversation_id
        WHERE (conversations.user_one = $1 AND conversations.user_two = $2)
        OR (conversations.user_one = $2 AND conversations.user_two = $1);
        `, [request.session.user_id, request.query.receiver_id])
      .then(({ rows: messages }) => {
        if (messages.length >= 1) {
          const result = groupBy(messages, 'id');
          return response.json(result);
        } else {
          createConversationID(request.session.user_id, request.query.receiver_id)
            .then((conversationID) => {
              values = [
                conversationID,
                request.session.user_id,
                request.query.receiver_id,
                `New conversation started`
              ];
              db.query(
                `
              INSERT INTO messages(conversation_id, sender_id, receiver_id, message_text)
              VALUES ($1, $2, $3, $4);
            `, values);
              db.query(
                `
                SELECT conversations.*, messages.sender_id, messages.receiver_id, messages.message_text, messages.time_sent
                FROM conversations
                JOIN messages ON conversations.id = messages.conversation_id
                WHERE (conversations.user_one = $1 AND conversations.user_two = $2)
                OR (conversations.user_one = $2 AND conversations.user_two = $1);
          
                `, [request.session.user_id, request.query.receiver_id])
                .then(({ rows: messages }) => {
                  const result = groupBy(messages, 'id');
                  return response.json(result);
                });
            });
        }
      });
  });

  router.get("/userinfo", (request, response) => {
    findUserByID(request.query.id)
      .then((userInfo) => {
        return response.json(userInfo).end;
      });
  });


  return router;
};
