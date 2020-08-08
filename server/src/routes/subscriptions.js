const router = require("express").Router();

module.exports = db => {
  router.get("/", (request, response) => {
    console.log("BANADANDADA")
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

  router.post("/delete", (request, response) => {
    const user_id = [
      request.body.user_id
    ];

    console.log("OOGA BOOGA", request.body.user_id)

    db.query(
      `
  DELETE from subscriptions
  WHERE user_id = ($1);
`,
      user_id
    )
      .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });
  })


  router.post("/", (request, response) => {
    const creation = [
      request.body.user_id,
      request.body.category_id
    ];

    console.log("MOMOMASMDOASMDAMSODMASODMAOSD cats", creation)
    db.query(
      `
       insert into subscriptions(user_id, category_id) 
       values ($1, $2)
       ON CONFLICT DO NOTHING;
       `,
      creation
    ).then(({ rows: accountInfo }) => {
      response.json(accountInfo);
    });
  });

  return router;
};



// I couldn't get this to work with values ($1) to search for the category_id here. Go over this with a mentor later. 
// Do it with fetchFilteredCategories too, which is in Service, Alert, and Event.