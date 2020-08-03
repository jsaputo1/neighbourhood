const router = require("express").Router();

module.exports =
  router.get("/", (request, response) => {
    response.send(
      `Index Page`
    );

  });

return router;