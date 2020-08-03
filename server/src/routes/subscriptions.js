const router = require("express").Router();

module.exports = db => {
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT *
      FROM subscriptions;
    `
    ).then(({ rows: services }) => {
      response.json(services);
    });
  });

  return router;
};
