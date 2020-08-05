const router = require("express").Router();
const { findUserCoordinates } = require("../helpers/findUserCoordinates");


module.exports = db => {
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT *
      FROM neighbourhoods
      RETURNING *;
    `
    ).then(({ rows: neighbourhoods }) => {
      response.json(neighbourhoods);
    });
  });

  router.get("/choices", (request, response) => {
    const email = 'jsaputo1@gmail.com';
    findUserCoordinates(email)
      .then((user) => {
        db.query(
          `
          SELECT * 
          FROM neighbourhoods;
    `
        ).then(({ rows: data }) => {
          for (items of data) {
            items.score = Math.sqrt(Math.pow((user.coordinates.x - items.coordinates.x), 2) + Math.pow((user.coordinates.y - items.coordinates.y), 2));
          }
          response.json(data.sort((a, b) => {
            if (a.score < b.score) return -1;
            if (a.score > b.score) return 1;
            return 0;
          }));
        });
      });
  });

  return router;
};

// sqrt((user.x - cor.x) ^ 2 + (user.y - cor.y) ^ 2);
