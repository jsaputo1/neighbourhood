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



// SELECT listings.*, favorites.*
//   FROM favorites;
// JOIN listings ON favorites.listing_id = listings.id;
// JOIN buyers ON favorites.buyer_id = buyers.id;
// WHERE buyers.email = $1;