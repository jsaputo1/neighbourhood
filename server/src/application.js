const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const db = require("./db");
const { read } = require("./helpers/read");
let cookieSession = require("cookie-session");

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
const twilioRoutes = require("./routes/twilio");
const accountRoutes = require("./routes/account");

module.exports = function application(
  ENV
  // actions = { updateAppointment: () => { } }
) {
  app.use(cors());
  app.use(helmet());
  app.use(bodyparser.json());
  app.use(
    cookieSession({
      name: "session",
      keys: [
        "f080ac7b-b838-4c5f-a1f4-b0a9fee10130",
        "c3fb18be-448b-4f6e-a377-49373e9b7e1a",
      ],
    })
  );

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
  app.use("/twilio", twilioRoutes(db));
  app.use("/account", accountRoutes(db));

  //Database reset
  app.get("/api/debug/reset", (request, response) => {
    Promise.all([
      read(path.resolve(__dirname, `db/schema/create.sql`)),
      read(path.resolve(__dirname, `db/schema/development.sql`)),
      read(path.resolve(__dirname, `db/schema/${ENV}.sql`)),
    ])
      .then(([create, seed]) => {
        return db.query(create).then(() => db.query(seed));
      })
      .then(() => {
        console.log("Database Reset");
        response.status(200).send("Database Reset");
        return true;
      })
      .catch((error) => {
        response.status(500).json(error);
        console.log(error);
      });
  });

  app.close = function () {
    return db.end();
  };

  return app;
};
