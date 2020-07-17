'use strict';

const axios = require("axios").default;

class Http {
    
  constructor({ url, headers, accessToken }) {
    headers = headers || {'Content-type': 'application/json'};

    if (!headers["Content-type"]){
        headers["Content-type"] = 'application/json';
    }

    const service = axios.create({
      url: url,
      timeout: 1000,
      headers,
    });

    if (accessToken) {
      service.interceptors.request.use((config) => {
        config.headers.common["Authorization"] = accessToken;
        return config;
      });
    }
    
    this.service = service;
  }

  get(path) {
    return this.service.get(this.service.defaults.url + path);
  }

  patch(path, payload, callback) {
    return this.service
      .request({
        method: "PATCH",
        url: this.service.defaults.url + path,
        responseType: "json",
        data: payload,
      })
      .then((response) => callback(response.status, response.data))
      .catch(err => {
        console.log(err)
    });
  }

  post(path, payload) {
    return this.service.request({
      method: "POST",
      url: this.service.defaults.url + path,
      responseType: "json",
      data: payload,
    });
  }
}

module.exports = Http;
