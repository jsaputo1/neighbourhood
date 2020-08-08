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



    router.post("/", (request, response) => {
        const values = [
            request.body.user_id,
            request.body.alert_type,
            request.body.subscriptions
        ];

        console.log(values);

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