const router = require("express").Router();

module.exports = db => {
    router.post("/", (request, response) => {
        res.header('Content-Type', 'application/json');
        twilioClient.messages
            .create({
                from: process.env.TWILIO_PHONE_NUMBER
                // to: I DON'T KNOW YET
                // body: I DON'T KNOW YET
            })
            .then(() => {
                res.send(JSON.stringify({ success: true }));
            })
            .catch(err => {
                console.log(err);
                res.send(JSON.stringify({ success: false }));
            });
    });

    return router;
};