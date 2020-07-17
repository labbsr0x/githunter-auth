"use strict";

const qs = require('qs');
const configFeed = require("../../infra/env/config");
const Http = require("../../RESTClient");

const config = configFeed.instance.get("github");

const getToken = async (code) => {

  const httpClient = new Http({
    url: config.url,
    accessToken: "rafa"
  });

  try {
    const response = await httpClient.post(config.endpoints.auth, {
      client_id: config.clientID,
      client_secret: config.clientSecret,
      code,
    });

    if (!response){
      return;
    }
  
    const data = qs.parse(response.data);
    return data;
  } catch (err) {
      console.log(err);
  }
  
};

module.exports = {getToken};
