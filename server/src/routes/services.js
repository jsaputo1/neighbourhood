const router = require("express").Router();

module.exports = (db) => {
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT services.*, users.first_name, users.last_name, users.profile_photo
      FROM services
      JOIN users
      ON services.user_id = users.id
      ORDER BY services.time_created DESC;
    `
    ).then(({ rows: services }) => {
      response.json(services);
    });
  });

  router.post("/", (request, response) => {
    const values = [
      request.body.user_id,
      request.body.category_id,
      request.body.neighbourhood_id,
      request.body.service_offer,
      request.body.title,
      request.body.coordinates,
      request.body.description,
      request.body.service_photo ? request.body.service_photo : 'https://i.imgur.com/j6IJGS2.png'
    ];

    db.query(
      `
        INSERT INTO services (user_id, category_id, neighbourhood_id, service_offer, title, coordinates, description, service_photo )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
          `,
      values
    )
      .then(() => {
        return db.query(
          `
        SELECT services.*, users.first_name, users.last_name, users.profile_photo
        FROM services
        JOIN users
        ON services.user_id = users.id
        ORDER BY services.time_created DESC;
      `
        );
      })
      .then((data) => {
        // response.status(200).end();
        response.json(data.rows);
        // console.log(
        //   "Service registered successfully with the following values",
        //   data.rows
        // );
      });
  });

  router.delete("/delete", (request, response) => {
    console.log("REQUEST", request.body.user_id, request.body.service_id);
    values = [request.body.user_id, request.body.service_id];
    db.query(
      `
      DELETE FROM services
      WHERE user_id = $1
      AND id = $2;
    `,
      values
    ).then(({ rows: services }) => {
      response.json(services);
    });
  });

  return router;
};
