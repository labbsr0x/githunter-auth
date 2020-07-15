const express = require('express');
const app = express();
const axios = require('axios').default;
const qs = require('qs');
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

const URL = "https://github.com"
const authEndPoint = "/login/oauth/access_token"
const client_id = "4c760cd460ed0870f7b8"
const client_secret = "e4d5260837168214ca812e30c58f42fb5427da8c"

const instance = axios.create({
    baseURL: URL,
    timeout: 1000,
    headers: {'Content-type': 'application/json'}
  });

// create a POST route
app.get('/auth', (req, res) => {

    const code = req.query && req.query.code? req.query.code : "";
    if (!code){
        res.send({ message: 'No session code found!' });
        return;
    }
    

    instance.post(authEndPoint, {
            client_id,
            client_secret,
            code
      }).then(function (response) {
        const data = qs.parse(response.data)

        if (data.error){
            res.send({ success: false, message: data.error_description });
            return;
        }

        res.send({ success: true, token: data.access_token });

      }).catch(function (err) {
          res.send({ success: false, message: err.message });
      });
  
});