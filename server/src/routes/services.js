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

  return router;
};
