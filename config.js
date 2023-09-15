
module.exports = {
    URL: "http://localhost:3000",
    PORT: 3000,
    isProduction: process.env.NODE_ENV === "production",
    
    DIR: __dirname,
    DB: __dirname + "/database",
    SERV: __dirname + "/serv",
    HELPERS: __dirname + "/serv/helpers",
    DIST: __dirname + "/dist",
    PUBLIC: __dirname + "/public",
    SRC: __dirname + "/src",
    TOKEN: {
        secret: "DAMN_A_SECRET_KEY",
        expire: "24h"
    }
};