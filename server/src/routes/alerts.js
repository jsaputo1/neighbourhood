const router = require("express").Router();

module.exports = db => {
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT alerts.*, users.first_name, users.last_name, users.profile_photo
      FROM alerts
      JOIN users
      ON alerts.user_id = users.id;
    `
    ).then(({ rows: alerts }) => {
      response.json(alerts);
    });
  });

  router.post("/", (request, response) => {
    const values = [
      request.body.user_id,
      request.body.category_id,
      request.body.title,
      request.body.description,
      request.body.alert_photo
    ];
    db.query(
      `
        INSERT INTO alerts (user_id, category_id, title, description, alert_photo)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
          `,
      values
    ).then((data) => {
      response.status(200).end();
      console.log(
        "Alert registered successfully with the following values",
        data.rows
      );
    });
  });

  return router;
};
