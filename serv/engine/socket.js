const G = require("./g.js");
const S = require("./s.js");

module.exports = async (io) => {
    const g = G(io);

    g.on("connection" , async (socket) => { 
        const s = S(socket);
        const userId = s.request.session.passport.user;
        console.log("Your User ID is", userId);
    });
}