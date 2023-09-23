class World {
    constructor(g) {
        this.players = {};
        this.maps = {};
        this.pj_changes = {};
        this.g = g;
    }

    getDataByMap() {
        return this.maps;
    }

    addPlayer(player) {
        let name = player.name;
        this.players[name] = player; //adding player to the list of online players
        if(!this.maps[player.pos.m]) this.maps[player.pos.m] = {};
        player.s.join("global"); //joining global channel
        player.s.join("system"); //joining system channel
        player.joinMap(this.maps[player.pos.m]); //joining actual map
        this.maps[player.pos.m][player.name] = player.getBaseData();
        
        
        let pj_changes = this.pj_changes;
        //on move events
        player.s.on("move", (data) => {
            if (!pj_changes[player.pos.m]) pj_changes[player.pos.m] = {};
            if (!pj_changes[player.pos.m][player.name]) pj_changes[player.pos.m][player.name] = {};
            pj_changes[player.pos.m][player.name]["pos"] = data;
            
        });

        player.s.on("disconnect" , ()=> {
            player.leaveMap();
            delete this.maps[player.pos.m][player.name];
            delete this.players[name];
        });
    }

    loop(fps) {
        //Game Loop
        setInterval(() => {
            //console.log(pj_changes)
            for (let m in this.pj_changes) {
                this.g.to(m).emit('pj_changes', this.pj_changes[m]); //sending players pj_changes to area
                this.pj_changes = {}; //restart the var
            }
        }, 1000 / fps || 30);
        
    }
};

module.exports = World;
