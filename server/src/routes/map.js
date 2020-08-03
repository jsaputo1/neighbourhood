const router = require("express").Router();

module.exports = db => {
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT events.*, alerts.*, services.*, users.*
      FROM events
      JOIN 
    `
    ).then(({ rows: allListings }) => {
      response.json(allListings);
    });
  });

  return router;
};