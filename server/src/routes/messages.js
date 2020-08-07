const router = require("express").Router();
const { groupBy } = require("../helpers/groupby");
const { createConversationID } = require("../helpers/createConversationID");

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
      request.body.message,
      '2020-08-06T04:52:25.931Z'
    ];
    db.query(
      `
      INSERT INTO messages(conversation_id, sender_id, receiver_id, message_text, time_sent)
      VALUES ($1, $2, $3, $4, $5);

        `, values)
      .then(() => {
        return response.status(200);
      });
  });

  const testNumber = 3;
  router.post("/newMessage", (request, response) => {
    createConversationID(request.session.user_id, testNumber)
      .then((conversationID) => {
        console.log("ConversationID inserted to values:", conversationID);
        values = [
          conversationID,
          '2',
          '3',
          "message route working",
          '2020-08-06T04:52:25.931Z',
        ];
        db.query(
          `
          INSERT INTO messages(conversation_id, sender_id, receiver_id, message_text, time_sent)
          VALUES ($1, $2, $3, $4, $5);
        `, values)
          .then((data) => {
            return response.status(200);
          });
      });
  });

  // router.post("/newConversation", (request, response) => {
  //   // console.log('Request Body', request.body);
  //   values = [
  //   ];
  //   db.query(
  //     `
  //     INSERT INTO conversations(id, user_one, user_two)
  //     VALUES (6, 3, 2);

  //       `, values)
  //     .then(() => {
  //       return response.status(200).json(data.rows);
  //     });
  // });


  // router.get("/newMessage", (request, response) => {
  //   conversationValues = ['2', '3'];
  //   messageValues = [];
  //   getConversationID = `
  //   SELECT id
  //   FROM conversations
  //   WHERE (user_one = 2 OR user_one = 3 )
  //   AND (user_two = 2 OR user_two = 3)
  //   `;
  //   db.query(getConversationID)
  //     .then((data) => {
  //       return response.status(200).json(data.rows);
  //       // const addMessage = `
  //       // INSERT INTO messages (buyer_id, listing_id, seller_id, title, description)
  //       // VALUES ($1, $2, $3, $4, $5);
  //       // `;
  //       // db.query(addMessage, messageValues)
  //       //   .then((response) => {
  //       //     return response.status(200);
  //       //   });
  //     });
  // });







  return router;
};

// INSERT INTO messages (buyer_id, listing_id, seller_id, title, description)
// VALUES ($1, $2, $3, $4, $5);
