const router = require("express").Router();

module.exports = (db) => {
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT events.*, users.first_name, users.last_name, users.profile_photo
      FROM events
      JOIN users
      ON events.user_id = users.id
      ORDER BY event_start ASC;
    `
    ).then(({ rows: events }) => {
      response.json(events);
    });
  });

  router.post("/", (request, response) => {
    const values = [
      request.body.user_id,
      request.body.category_id,
      request.body.neighbourhood_id,
      request.body.title,
      request.body.coordinates,
      request.body.description,
      request.body.event_start,
      request.body.event_time,
      request.body.event_photo ? request.body.event_photo : 'https://i.imgur.com/j6IJGS2.png'
    ];
    db.query(
      `
        INSERT INTO events (user_id, category_id, neighbourhood_id, title, coordinates, description, event_start, event_time, event_photo)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
          `,
      values
    )
      .then(() => {
        return db.query(
          `
        SELECT events.*, users.first_name, users.last_name, users.profile_photo
        FROM events
        JOIN users
        ON events.user_id = users.id;
      `
        );
      })
      .then((data) => {
        // response.status(200).end();
        response.json(data.rows);
        console.log(
          "Event registered successfully with the following values",
          data.rows
        );
      });
  });


  router.delete("/delete", (request, response) => {
    console.log("REQUEST", request.body.user_id, request.body.event_id)
    values = [
      request.body.user_id,
      request.body.title,
    ]
    db.query(
      `
      DELETE FROM events
      WHERE user_id = $1
      AND title = $2
      RETURNING *;
    `,
      values
    ).then(({ rows: events }) => {
      response.json(events);
    });
  });






  return router;
};
