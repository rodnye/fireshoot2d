const config = require("../../config.js");
const { Equipment } = require(config.SERV + "/helpers/db.js");

class Player {
    constructor(id, name, s, x, y, z , a, m, lvl, xp, acclevel) {
        this.id = id;
        this.name = name;
        this.s = s;
        this.pos = {
            x, y, z,a, m
        }
        this.equipment = {};
        this.stats = {};
        this.status = {};
        this.lvl = lvl;
        this.xp = xp;
        this.admin = (acclevel == 2 ? true : false);
    }

    get() {
        return {
            name: this.name,
            pos: this.pos,
            equipment: this.equipment,
            stats: this.stats,
            status: this.status,
            lvl: this.lvl,
            xp: this.xp
        };
    }

    getBaseData(){
        return {
            name: this.name,
            pos: this.pos,
            status: this.status,
            lvl: this.lvl
        };
    }

    getPos() {
        return {
            name: this.name,
            pos: this.pos
        };
    }

    async config() {
        const [eq, ceq] = await Equipment.findOrCreate({
            where: { user_id: this.id }
        });
        let equipment = eq || ceq;
        this.equipment = {
            head: equipment.head,
            body: equipment.body,
            feet: equipment.feet,
            pweapon: equipment.pweapon,
            sweapon: equipment.sweapon
        };
    }

    sendPlayerData() {
        this.s.emit("player_data", this.get());
    }

    leaveMap(){
        this.s.to(this.pos.m).emit("del_pj", this.name);
        this.s.leave(this.pos.m)
    }

    changeMap(emap , mapPlayers) {
        this.leaveMap();
        this.pos = emap;
        this.config();
        this.joinMap(mapPlayers);
    }

    joinMap(mapPlayers){
        this.s.join(this.pos.m);
        this.s.emit("get_players" , mapPlayers);
        this.s.to(this.pos.m).emit("new_pj", this.getBaseData());
    }
}


module.exports = Player;
