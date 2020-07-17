'use strict';

const github = require("./github/github.service");
const gitlab = require("./gitlab/gitlab.service")

const providers = {
    GITHUB: "github",
    GITLAB: "gitlab",
    GITLAB_FONTES: "gitlab_fontes"
}

const auth = (code, provider) => {
    provider = provider || "";

    var theContract = {};

    switch (provider) {
        case providers.GITHUB:
            theContract = githubContract(code);
            break;
        case providers.GITLAB:
            theContract = gitlabContract(code);
            break;
        default:
            theContract = {success: false, message: "Provider undefined."}
            break;
    }


    return theContract;
}

const githubContract = async (code) => {
    const data = await github.getToken(code);
    
    if (data && data.error){
        return { success: false, message: data.error_description };
    }

    return { success: true, token: data.access_token };
}

const gitlabContract = async (code) => {
    const data = await gitlab.getToken(code);

    if (data && data.error){
        return { success: false, message: data.error_description };
    }

    return {success: true, token: data.access_token};
}

module.exports = {auth};
