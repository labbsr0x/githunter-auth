"use strict";

const configFeed = require("../env/config.js");
const express = require("express");

const initRoutes = async (app) => {
  // Routers
  const routers = require("../../router/router");
  app.use(configFeed.instance.get("server", "baseDir"), routers());
};

const configureApp = (app) => {
  const bodyParser = require("body-parser");

  app.use(bodyParser.json());

  var cors = require("cors");
  app.use(cors());
};

const startApp = (app) => {
  const http = require("http");
  const server = http.createServer(app);

  var appEnv = configFeed.instance.get("server");
  server.listen(appEnv.port, appEnv.url, () => {
    console.log(
      "Starting app for environment: " + configFeed.instance.getEnv("NODE_ENV")
    );
    console.log("Port: " + appEnv.port);
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url + ":" + appEnv.port);
  });
};

const init = () => {
  const app = express();
  configureApp(app);
  initRoutes(app);
  startApp(app);
};

module.exports = init;
