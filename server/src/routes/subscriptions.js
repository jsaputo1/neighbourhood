const router = require("express").Router();

module.exports = db => {
  router.get("/", (request, response) => {
    // const values = [
    //   request.body.category_id,
    // ];
    db.query(
      `
      SELECT *
      FROM subscriptions;
    `,
      // values
    ).then(({ rows: services }) => {
      response.json(services);
    });
  });

  return router;
};



// I couldn't get this to work with values ($1) to search for the category_id here. Go over this with a mentor later. 
// Do it with fetchFilteredCategories too, which is in Service, Alert, and Event.