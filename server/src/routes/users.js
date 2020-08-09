const router = require("express").Router();
const { findUserByEmail } = require("../helpers/findUserEmail");

module.exports = (db) => {
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
    const values = [
      request.body.firstName,
      request.body.email,
      request.body.lastName,
      request.body.password,
      `(${request.body.coordinates.latitude}, ${request.body.coordinates.longitude})`
    ];

    findUserByEmail(request.body.email)
      .then((user) => {
        if (user) {
          response.status(406).send("user already registered");
        } else {
          db.query(
            `
        INSERT INTO users (first_name, email, last_name, password, coordinates)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
          `,
            values
          )
            .then((data) => {
              const userObj = data.rows[0];
              request.session["user_id"] = userObj.id;
              console.log("user cookie is:", request.session["user_id"]);
              response.status(200).json(userObj);
              // console.log("User registered successfully with the following values", userObj);
            });
        }
      });
  });

  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(
      //gets the user object with its email and password
      `SELECT * FROM users WHERE email LIKE $1 AND password = crypt($2, password);`,
      [email, password]
    )
      .then((data) => {
        if (data) {
          const userObj = data.rows[0];
          console.log("User found with the following values:", userObj);
          //Sets the cookie when login in
          req.session["user_id"] = userObj.id;
          return res.json(userObj);
        }
      })
      .catch((err) => console.error("query error", err.stack));
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    return res.json({});
  });

  router.get("/phone-numbers", (request, response) => {
    db.query(
      `
      SELECT id, phone_number
      FROM users;
    `
      //WHERE email = userCookie
    ).then(({ rows: userData }) => {
      response.json(userData);
    });
  });


  router.post("/notifcation-settings", (request, response) => {
    const values = [
      request.body.alert_types,
      request.body.user_id
    ];
    db.query(
      `
      UPDATE users
      SET alert_types = ($1)
      WHERE id = ($2);
`,
      values
    ).then(({ rows: settings }) => {
      response.json(settings);
    })
      .catch((err) => console.error("query error", err.stack));

  })

  return router;
};
