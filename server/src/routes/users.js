const router = require("express").Router();
const { findUserEmail } = require("../helpers/findUserEmail");

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
      request.body.lastName,
      request.body.email,
      request.body.password
    ];
    findUserEmail('jsaputo1@gmail.com')
      .then(() => {
        db.query(
          `
        INSERT INTO users (first_name, email, last_name, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
          `, values
        )
          .then((data) => {
            console.log("User registered successfully with the following values", data.rows);
          });
      })
      .catch((err) => {
        response.status(406).json({ error: err.message });
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
