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
            //if(data.y < 0) data.y = 0;
            console.log(data);
            if (!this.pj_changes[player.pos.m]) this.pj_changes[player.pos.m] = {};
            if (!this.pj_changes[player.pos.m][player.name]) this.pj_changes[player.pos.m][player.name] = {};
            this.pj_changes[player.pos.m][player.name]["pos"] = data;
            //console.log(this.pj_changes.m_1);
            
        });
        //on angle  change
        player.s.on("ang", (data) => {
            //if(data.y < 0) data.y = 0;
            if (!this.pj_changes[player.pos.m]) this.pj_changes[player.pos.m] = {};
            if (!this.pj_changes[player.pos.m][player.name]) this.pj_changes[player.pos.m][player.name] = {};
            this.pj_changes[player.pos.m][player.name]["a"] = data.a;
            //console.log(this.pj_changes.m_1);
            
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
            
            for (let m in this.pj_changes) {
                this.g.to(m).emit('pj_changes', this.pj_changes[m]); //sending players pj_changes to area
            }
            this.pj_changes = {}; //restart the var
        }, 1000 / fps || 30);
        
    }
};

module.exports = World;
