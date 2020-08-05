const router = require("express").Router();
const { findUserCoordinates } = require("../helpers/findUserCoordinates");
const { findUserByEmail } = require("../helpers/findUserEmail");

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

  router.post("/addNeighbourhood", (request, response) => {
    const email = request.body.email;
    findUserByEmail(email)
      .then((user) => {
        db.query(
          `
          UPDATE users 
          SET neighbourhood_id = $1
          WHERE id = $2
          RETURNING*;
          `, [request.body.id, user.id]
        ).then((data) => {
          response.status(200).end();
          console.log("Neighbourhood ID added:", data.rows[0].neighbourhood_id, "to user id:", user.id);
        });
      });
  });

  return router;
};
