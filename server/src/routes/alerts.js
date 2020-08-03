const router = require("express").Router();

module.exports = db => {
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT *
      FROM alerts;
    `
    ).then(({ rows: alerts }) => {
      response.json(alerts);
    });
  });

  return router;
};
