
module.exports = {
    PORT: 3000,
    isProduction: process.env.NODE_ENV === "production",
    
    DIR: __dirname,
    DB: __dirname + "/database",
    SERV: __dirname + "/serv",
    DIST: __dirname + "/dist",
    PUBLIC: __dirname + "/public",
    SRC: __dirname + "/src",
};