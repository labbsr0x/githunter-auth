"use strict";

const configFeed = require("../../infra/env/config");
const Http = require("../../RESTClient");

const config = configFeed.instance.get("gitlab");

const getToken = async (code) => {
  const httpClient = new Http({
    url: config.url,
  });

  try {
    const response = await httpClient.post(config.endpoints.auth, {
      client_id: config.clientID,
      client_secret: config.clientSecret,
      code,
      grant_type: config.grantType,
      redirect_uri: config.redirect,
    });

    if (!response) {
        return;
      }
  
      return response.data;
  } catch (err) {
      return err.response.data;
  }

  
};

module.exports = { getToken };
