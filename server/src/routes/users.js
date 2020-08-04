const router = require("express").Router();
const { findUserByEmail } = require("../helpers/findUserEmail");

module.exports = db => {

  router.get("/profile-info", (request, response) => {
    db.query(
      `
      SELECT *
      FROM users;
    `
      //WHERE email = userCookie
    ).then(({ rows: userData }) => {
      response.json(userData);
    });
  });

  router.post("/register", (request, response) => {
    const values = [
      request.body.firstName,
      request.body.email,
      request.body.lastName,
      request.body.password,
      `(${request.body.coordinates.latitude}, ${request.body.coordinates.longitude})`
    ];

    findUserByEmail(request.body.email)
      .then((user) => {
        if (user) {
          response.status(406).send("user already registered");
        } else {
          db.query(
            `
        INSERT INTO users (first_name, email, last_name, password, coordinates)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
          `, values
          )
            .then((data) => {
              response.status(200).end();
              console.log("User registered successfully with the following values", data.rows);
            });
        }
      });
  });

  router.post("/addNeighbourhood", (request, response) => {
    const neighbourhoodID = [];
    db.query(
      `
      INSERT INTO users(neighbourhood_id) 
      VALUES ($1)
      `, neighbourhoodID
    ).then(({ rows: idAdded }) => {
      console.log("Neighbourhood ID added is:", idAdded);
    });
  });

  return router;
};
