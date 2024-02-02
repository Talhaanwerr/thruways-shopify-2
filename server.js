require('express-async-errors')
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const shopifyRoute = require("./routes/shopify.route");
const error = require("./middlewares/error");

app.use(
  "/webhooks/app/uninstalled",
  bodyParser.raw({ type: "application/json" })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/shopify", shopifyRoute);

app.use(error);

const httpServer = http.createServer(app);
httpServer.listen(8080, () =>
  console.log("Your app is listening on port 8080.")
);
