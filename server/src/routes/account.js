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




// router.post("/", (req, res) => {
//     res.header('Content-Type', 'application/json');
//     const numbers = req.body.phoneNumbers
//     const categoryName = req.body.categoryName
//     console.log("NUMBERS", numbers)

//     let x = 500

//     Promise.all(
//         numbers.map(number => {
//             console.log(number)
//             setTimeout(() => {
//                 return (twilioClient.messages
//                     .create({
//                         from: process.env.TWILIO_MESSAGING_SERVICE_SID,
//                         to: number,
//                         body: `CupOSugah: A new posting was made in ${categoryName}`
//                         // body: req.body.body
//                         // to: +17802464666,
//                     })
//                 )
//             }, x)
//             x += 1000;
//         })
//     )
//         .then(() => {
//             res.send(JSON.stringify({ success: true }));
//         })
//         .catch(err => {
//             console.log(err);
//             res.send(JSON.stringify({ success: false }));
//         });
// });







// router.post("/a", (request, response) => {
    // const creation = [
    //   request.body.user_id,
    //   request.body.categories
    // ];

    // console.log("IS ME", creation);

//     Promise.all(
//         request.body.categories.map(category => {
//             console.log("MOMOMOMOM", category)
//             const creation = [
//                 request.body.user_id,
//                 category
//             ];

//             db.query(
//                 `
//       insert into subscriptions(user_id, category_id) 
//       values ($1, $2)
//       `,
//                 creation
//             )
//         }))
//         .catch(err => {
//             console.log(err);
//         });

// })