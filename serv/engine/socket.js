const G = require("./socket/g.js");
const S = require("./socket/s.js");
const {Player , Players} = require("./player.js");
const config = require("../../config.js");
const {Pj} = require(config.SERV + "/helpers/db.js");
const uid = require(config.SERV + "/helpers/uid.js");
let spos = config.START_POS;
const Maps = require("./map.js");

module.exports = async (io) => {
    const g = G(io);

    let maps = new Maps();
    maps.load(config.DB + "/maps");
    
    let players = new Players();

    g.on("connection" , async (socket) => { 
        const s = S(socket);
        //checking if user is on session storage , if not reject
        if(!s.request.session || !s.request.session.passport || !s.request.session.passport.user) return s.disconnect();
        const user_id = /*"pkZI01f3" ||*/  s.request.session.passport.user;
        console.log("Your User ID is", user_id);
        spos.name = "pj_" + uid.num(5);
        spos.user_id = user_id;
        //creating player if not exist in db and loading if exists
        const [_pj, created] = await Pj.findOrCreate({
            where: { user_id: user_id },
            defaults: spos
          });
        let pj = _pj || created;
        
        //retrieving map data if user havent , returning true if user have the map updated
        s.on("get_map" , (data) => {
            if(data.vhash && Array.isArray(data.vhash) && maps.get(pj.m) && data.vhash.includes(maps.get(pj.m).vhash)) {
                s.emit("get_map" , true);
            } else s.emit("get_map" , maps.get(pj.m));
        });

        //retrieving players data
        let player = new Player(pj.user_id , pj.name , s , pj.x , pj.y , pj.a , pj.m);
        s.on("get_players" , (data) => {
            players.add(player);
        });
        
        
    });

    //Game Loop
	setInterval(function(){
        let pom = players.getPosByMap();
		for(let m in pom) g.to(m).emit('pj_pos', pom[m]); //sending player position to every room
	}, 30);
}