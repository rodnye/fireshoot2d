const socket = require("./socket");

class World {
    constructor(w) {
        this.players = {};
        this.maps = {};
        this.pj_changes = {};
        this.w = w;
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
        
        //on move events
        player.s.on("move", (data) => {
            if (!this.pj_changes[player.pos.m]) this.pj_changes[player.pos.m] = {};
            if (!this.pj_changes[player.pos.m][player.name]) this.pj_changes[player.pos.m][player.name] = {};
            this.pj_changes[player.pos.m][player.name]["pos"] = data;
            if(data.a) {
                this.pj_changes[player.pos.m][player.name]["a"] = data.a;
                player.pos.a = data.a;
            }
            player.pos.x = data.x;
            player.pos.y = data.y;
            player.pos.z = data.z;
        });

        //on angle  change
        player.s.on("angle", (data) => {
            if (!this.pj_changes[player.pos.m]) this.pj_changes[player.pos.m] = {};
            if (!this.pj_changes[player.pos.m][player.name]) this.pj_changes[player.pos.m][player.name] = {};
            this.pj_changes[player.pos.m][player.name]["a"] = data;

            player.pos.a = data;
        });

        player.s.on("disconnect" , ()=> {
            player.leaveMap();
            delete this.maps[player.pos.m][player.name];
            delete this.players[name];
        });
    }
    
    emitAll(event, message){
      this.w.emit(event, message);
    };
    
    emitToRoom(room , event , message){
      this.w.in(room).emit(event , message);
    };

    loop(fps) {
        //Game Loop
        setInterval(() => {
            
            for (let m in this.pj_changes) {
                this.g.in(m).emit('pj_changes', this.pj_changes[m]); //sending players pj_changes to area
            }
            //if(JSON.stringify(this.pj_changes) != "{}") console.log(this.pj_changes);
            this.pj_changes = {}; //restart the var
        }, 1000 / fps || 30);
        
    }
};

module.exports = World;
