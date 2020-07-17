'use strict';

const express = require('express');

const authController = require("../controller/auth/auth.controller");

const requestFilter = async (req, res, next) => {
  // Just in case if needed.
  next();
}

module.exports = (middlewares) => {
  const router = express.Router();

  if (middlewares) {
    middlewares.forEach(middleware => router.use(middleware));
  }
  
  router.all("/*", requestFilter);

  router.get("/auth", authController);


  return router;
};