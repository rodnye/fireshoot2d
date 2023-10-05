
module.exports = {
    URL: "http://localhost:3000",
    PORT: 3000,
    isProduction: process.env.NODE_ENV === "production",
    pages: ["game", "auth"],

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
    },
    START_POS: {
        x: 25,
        y: 2,
        z: 25,
        a: 0,
        m: "m_1"
    }
};