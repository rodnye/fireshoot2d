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
        player.s.join(player.pos.m); //joining current area channel
        player.s.emit("get_players" , this.maps[player.pos.m]);
        this.maps[player.pos.m][player.name] = player.getBaseData();
        player.s.to(player.pos.m).emit("new_pj", player.getBaseData()); //sending player info to all players in same area
        
        //on move events
        player.s.on("move", (data) => {
            if (!this.changes[player.pos.m]) this.changes[player.pos.m] = {};
            if (!this.changes[player.pos.m][player.name]) this.changes[player.pos.m][player.name] = {};
            this.changes[player.pos.m][player.name]["pos"] = data;
            
        });
    }

    loop(fps) {
        //Game Loop
        let changes = this.changes;

        let g = this.g;
        setInterval(function () {
            //console.log(changes)
            for (let m in changes) g.to(m).emit('changes', changes[m]); //sending players changes to area
        }, 1000 / fps || 30);
        delete this.changes;
    }
};

module.exports = World;
