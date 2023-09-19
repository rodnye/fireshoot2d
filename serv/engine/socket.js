const G = require("./socket/g.js");
const S = require("./socket/s.js");
const {Player , Players} = require("./player.js");
const config = require("../../config.js");
const {Pj} = require(config.SERV + "/helpers/db.js");
const uid = require(config.SERV + "/helpers/uid.js");
let spos = config.START_POS;

module.exports = async (io) => {
    const g = G(io);
    let players = new Players();
    g.on("connection" , async (socket) => { 
        const s = S(socket);
        if(!s.request.session || !s.request.session.passport || !s.request.session.passport.user) return s.disconnect();
        const user_id = s.request.session.passport.user;
        console.log("Your User ID is", user_id);
        spos.name = "pj_" + uid.num(5);
        spos.user_id = user_id;
        const [_pj, created] = await Pj.findOrCreate({
            where: { user_id: user_id },
            defaults: spos
          });
        let pj = _pj || created;
        
        let player = new Player(pj.user_id , pj.name , s , pj.x , pj.y , pj.a , pj.m);
        players.add(player);
        
    });

    //Game Loop
	setInterval(function(){
        let pom = players.getPosByMap();
		for(let m in pom) g.to(m).emit('pj_pos', pom[m]);
	}, 30);
}