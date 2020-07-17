'use strict';

const contract = require("../../services/contract");

const auth = async (req, res) => {

    const {code, provider} = req.query;
    if (!code){
        res.send({ message: 'No session code found!' });
        return;
    }

    const result = await contract.auth(code, provider);

    res.send(result);
}

module.exports = auth;