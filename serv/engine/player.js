const config = require("../../config.js");
const { Equipment } = require(config.SERV + "/helpers/db.js");

class Player {
    constructor(id, name, s, x, y, a, m, lvl, xp) {
        this.id = id;
        this.name = name;
        this.s = s;
        this.pos = {
            x, y, a, m
        }
        this.equipment = {};
        this.stats = {};
        this.lvl = lvl;
        this.xp = xp;
    }

    get() {
        return {
            name: this.name,
            pos: this.pos,
            equipment: this.equipment,
            stats: this.stats,
            lvl,
            xp
        };
    }

    async config() {
        const [eq, ceq] = await Equipment.findOrCreate({
            where: { user_id: user_id }
        });
        let equipment = eq || ceq;
        this.equipment = {
            head: equipment.head,
            body: equipment.body,
            feet: equipment.feet,
            pweapon: equipment.pweapon,
            sweapon: equipment.sweapon
        };
        this.s.emit("player_data", this.get());
    }
}


module.exports = Player;
