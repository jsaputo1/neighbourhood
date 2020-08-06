const router = require("express").Router();

module.exports = db => {
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT services.*, users.first_name, users.last_name, users.profile_photo
      FROM services
      JOIN users
      ON services.user_id = users.id;
    `
    ).then(({ rows: services }) => {
      response.json(services);
    });
  });

  router.post("/", (request, response) => {
    const values = [
      request.body.user_id,
      request.body.category_id,
      request.body.service_offer,
      request.body.title,
      request.body.description,
      request.body.service_photo
    ];
    db.query(
      `
        INSERT INTO services (user_id, category_id, service_offer, title, description, service_photo)
        VALUES ($1, $2, $3, $4, $5, $6);
          `,
      values
    )
      .then(() => {
        return db.query(
          `
        SELECT services.*, users.first_name, users.last_name, users.profile_photo
        FROM services
        JOIN users
        ON services.user_id = users.id;
      `
        )
      })
      .then((data) => {
        // response.status(200).end();
        response.json(data.rows)
        console.log(
          "Service registered successfully with the following values",
          data.rows
        );
      });
  });

  return router;
};
