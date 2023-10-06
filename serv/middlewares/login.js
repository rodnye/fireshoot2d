const config = require("../../config.js");
const { User } = require(config.SERV + "/helpers/db.js");
const uid = require(config.SERV + "/helpers/uid.js");

module.exports = {
    login: (req, res) => {
        if(!req.body || !req.booy.password || !req.body.user) return;
        
    }
}