const router = require("express").Router();

module.exports = db => {
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT *
      FROM events;
    `
    ).then(({ rows: events }) => {
      response.json(events);
    });
  });

  return router;
};
