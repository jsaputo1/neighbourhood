const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const db = require("./db");
const { read } = require("./helpers/read");

//Route path variables
const indexRoutes = require("./routes/index");
const neighbourhoodRoutes = require("./routes/neighbourhood");
const userRoutes = require("./routes/users");
const eventRoutes = require("./routes/events");
const serviceRoutes = require("./routes/services");
const alertRoutes = require("./routes/alerts");
const messageRoutes = require("./routes/messages");
const mapRoutes = require("./routes/map");
const subscriptionRoutes = require("./routes/subscriptions");
const categoryRoutes = require("./routes/categories");

module.exports = function application(
  ENV,
  // actions = { updateAppointment: () => { } }
) {
  app.use(cors());
  app.use(helmet());
  app.use(bodyparser.json());

  //Routes
  app.use("/", indexRoutes);
  app.use("/neighbourhood", neighbourhoodRoutes(db));
  app.use("/users", userRoutes(db));
  app.use("/events", eventRoutes(db));
  app.use("/services", serviceRoutes(db));
  app.use("/alerts", alertRoutes(db));
  app.use("/messages", messageRoutes(db));
  app.use("/map", mapRoutes(db));
  app.use("/subscriptions", subscriptionRoutes(db));
  app.use("/categories", categoryRoutes(db));

  //Database reset
  Promise.all([
    read(path.resolve(__dirname, `db/schema/create.sql`)),
    read(path.resolve(__dirname, `db/schema/development.sql`)),
    read(path.resolve(__dirname, `db/schema/${ENV}.sql`))
  ])
    .then(([create, seed]) => {
      app.get("/api/debug/reset", (request, response) => {
        db.query(create)
          .then(() => db.query(seed))
          .then(() => {
            console.log("Database Reset");
            response.status(200).send("Database Reset");
          });
      });
    })
    .catch(error => {
      console.log(`Error setting up the reset route: ${error}`);
    });

  app.close = function () {
    return db.end();
  };

  return app;
};
