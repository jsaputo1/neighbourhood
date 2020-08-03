const router = require("express").Router();

module.exports = db => {
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT *
      FROM neighbourhoods;
    `
    ).then(({ rows: neighbourhoods }) => {
      response.json(neighbourhoods);
    });
  });

  return router;
};
