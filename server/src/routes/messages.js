const router = require("express").Router();

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
      SELECT *
      FROM messages
      WHERE (sender_id = $1 OR receiver_id = $1);
    `, [request.session["user_id"]])
      .then(({ rows: messages }) => {
        return response.json(messages);
      });
  });

  return router;
};
