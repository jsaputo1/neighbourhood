const router = require("express").Router();

module.exports = db => {
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT *
      FROM services;
    `
    ).then(({ rows: services }) => {
      response.json(services);
    });
  });

  return router;
};
