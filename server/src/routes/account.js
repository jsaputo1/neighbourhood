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
        const IDFK = [
            request.body.user_id,
            request.body.alert_type,
            request.body.subscriptions
        ];

        const subscriptions = request.body.subscriptions
        let createSubs = []
        let deleteSubs = []

        const sortSubscriptions = function () {
            for (const entry in subscriptions) {
                if (subscriptions[entry] === true) {
                    createSubs.push(entry)
                } else {
                    deleteSubs.push(entry)
                }
            }
        };
        sortSubscriptions();

        console.log(createSubs, deleteSubs);

        const user_id = [
            request.body.user_id
        ];

        const creation = [
            request.body.user_id,
            // createSubs,
        ];


        db.query(
            `
      DELETE from subscriptions
      WHERE user_id = ($1)
    `,
            user_id
        ),

            db.query(
                `
                insert into subscriptions(user_id, category_id) 
                select ($1), unnest(array[5, 6, 7, 8, 9]);
                `,
                creation
            )

    });





    return router;
};



