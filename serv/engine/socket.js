const G = require("./socket/g.js");
const S = require("./socket/s.js");
const {Player , Players} = require("./player.js");

module.exports = async (io) => {
    const g = G(io);
    let players = new Players();
    g.on("connection" , async (socket) => { 
        const s = S(socket);
        const userId = s.request.session.passport.user;
        console.log("Your User ID is", userId);
        //TO-DO
        /*
        let player = new Player(userId , ...)
        players.add(player);
        */
    });
}