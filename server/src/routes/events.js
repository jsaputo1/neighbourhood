const router = require("express").Router();

module.exports = db => {
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT events.*, users.first_name, users.last_name, users.profile_photo
      FROM events
      JOIN users
      ON events.user_id = users.id;
    `
    ).then(({ rows: events }) => {
      response.json(events);
    });
  });

  router.post("/", (request, response) => {
    const values = [
      request.body.user_id,
      request.body.category_id,
      request.body.title,
      request.body.description,
      request.body.event_start,
      request.body.event_end,
      request.body.event_photo
    ];
    db.query(
      `
        INSERT INTO events (user_id, category_id, title, description, event_start, event_end, event_photo)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
          `,
      values
    ).then(() => {
      return db.query(
        `
        SELECT events.*, users.first_name, users.last_name, users.profile_photo
        FROM events
        JOIN users
        ON events.user_id = users.id;
      `
      )
    }).then((data) => {
      // response.status(200).end();
      response.json(data.rows)
      console.log(
        "Event registered successfully with the following values",
        data.rows
      );
    });
  });
  return router;
};
