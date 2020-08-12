const router = require("express").Router();
const twilioClient = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

module.exports = db => {
    router.post("/", (req, res) => {
        res.header('Content-Type', 'application/json');
        const numbers = req.body.phoneNumbers
        const categoryName = req.body.categoryName
        const title = req.body.title
        console.log("NUMBERS", numbers, title)

        let x = 500

        Promise.all(
            numbers.map(number => {
                console.log(number)
                setTimeout(() => {
                    return (twilioClient.messages
                        .create({
                            from: process.env.TWILIO_MESSAGING_SERVICE_SID,
                            to: number,
                            body: `CupOSugah: ${title} was was posted in ${categoryName}`
                            // body: req.body.body
                            // to: +17802464666,
                        })
                    )
                }, x)
                x += 1000;
            })
        )
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