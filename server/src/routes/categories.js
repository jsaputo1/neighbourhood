const router = require("express").Router();

module.exports = db => {
    router.get("/", (request, response) => {
        const values = [
            1
        ];
        db.query(
            `
      SELECT *
      FROM categories;
    `
        ).then(({ rows: alerts }) => {
            response.json(alerts);
        });
    });

    return router;
};