
var config = require('config');

// create a unique, global symbol name
// -----------------------------------
const CONFIG = Symbol.for("config");

function getConfig(context, key){
    if (config.has(context)){
        var contextConf = config.get(context);
        if (key && contextConf.has(key))
            return contextConf.get(key);
        return contextConf;
    }
    return "";
}

function getEnv(envName){
    return config.util.getEnv(envName);
}

// check if the global object has this symbol
// add it if it does not have the symbol, yet
// ------------------------------------------
var globalSymbols = Object.getOwnPropertySymbols(global);
var initialized = (globalSymbols.indexOf(CONFIG) > -1);

if (!initialized){
    global[CONFIG] = {
        get: function(context, key){
            return getConfig(context, key);
        },
        getEnv: function (envName) {
            return getEnv(envName);
        }
    };
}

// define the singleton API
// ------------------------
var singleton = {};

Object.defineProperty(singleton, "instance", {
    get: function(){
        return global[CONFIG];
    }
});

// ensure the API is never changed
// -------------------------------
Object.freeze(singleton);

// export the singleton API only
// -----------------------------
module.exports = singleton;