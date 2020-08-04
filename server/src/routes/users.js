const router = require("express").Router();

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
    const values = [];
    db.query(
      `
      INSERT INTO users(email, password, time_created, coordinates, first_name, last_name, phone_number, profile_photo, last_logout, bio, alert_types)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, values
    ).then(({ rows: data }) => {
      console.log("User registered with the following values", data);
      response.redirect("/selectNeighbourhood");
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
      response.redirect("/index");
    });
  });






  return router;
};
