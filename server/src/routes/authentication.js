const router = require("express").Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(
      //gets the user object with its email and password
      `SELECT * FROM users WHERE email LIKE $1 AND password = crypt($2, password);`,
      [email, password]
    )
      .then((data) => {
        if (data) {
          return res.json(data.rows[0]);
        }
      })
      .catch((err) => console.error("query error", err.stack));
  });

  return router;
};
