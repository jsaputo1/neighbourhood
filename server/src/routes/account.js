const router = require("express").Router();

module.exports = db => {
    router.get("/", (request, response) => {
        db.query(
            `
      SELECT neighbourhoods.name, neighbourhoods.id
      FROM neighbourhoods;
    `
        ).then(({ rows: accountInfo }) => {
            response.json(accountInfo);
        });
    });

    return router;
};