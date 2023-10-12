const config = require("../../config.js");
const { User } = require(config.SERV + "/helpers/db.js");
const uid = require(config.SERV + "/helpers/uid.js");


const login = async (req, res) => {
    console.log("lol");
    if (!req.body || !req.body.password || !req.body.user) return res.status(400).json({status: false});
    const [user, created] = await User.findOrCreate({
        where: { username: req.body.user},
        defaults: {
            username: req.body.user,
            user_id: uid.alphanum(8)
        }
    });
    let us = user || created;
    if (us) {
        return res.json({ id: us.user_id });
    }else{

    }
}

module.exports = login;