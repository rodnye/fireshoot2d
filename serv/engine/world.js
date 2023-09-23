class World {
    constructor(g) {
        this.players = {};
        this.maps = {};
        this.changes = {};
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
        
        
        let changes = this.changes;
        //on move events
        player.s.on("move", (data) => {
            if (!changes[player.pos.m]) changes[player.pos.m] = {};
            if (!changes[player.pos.m][player.name]) changes[player.pos.m][player.name] = {};
            changes[player.pos.m][player.name]["pos"] = data;
            
        });
    }

    loop(fps) {
        //Game Loop
        setInterval(() => {
            //console.log(changes)
            for (let m in this.changes) {
                this.g.to(m).emit('changes', this.changes[m]); //sending players changes to area
                this.changes = {}; //restart the var
            }
        }, 1000 / fps || 30);
        
    }
};

module.exports = World;
