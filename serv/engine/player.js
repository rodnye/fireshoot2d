
class Player {
    constructor(id, name, s, x, y, a, m) {
        this.id = id;
        this.name = name;
        this.s = s;
        this.x = x;
        this.y = y;
        this.a = a;
        this.m = m;
    }

    get() {
        return {
            id: this.id,
            name: this.name,
            x: this.x,
            y: this.y,
            a: this.a,
            m: this.m
        }
    }
}
class Players {
    constructor() {
        this.players = {};
        this.map = {};
    }

    get(){
        return this.players;
    }

    getPosByMap() {
        return this.map;
    }

    add(player) {
        if(!this.players[player.name]) {
            this.players[player.name] = player.get();
            if(!this.map[player.m]) this.map[player.m] = {};
            this.map[player.m][player.name] = {
                x: player.x ,
                y: player.y ,
                a: player.a 
            };
            player.s.join("global");
            player.s.join(player.m);
            player.s.to(player.m).broadcast("connected" , player.name);
        } else {
            if(this.players[player.name].m != player.m) {
                player.s.to(this.players[player.name].m).broadcast("disconnected" , player.name);
                player.s.leave(this.players[player.name].m);
                player.s.join(player.m);
                player.s.to(player.m).broadcast("connected" , player.name);
            }
            this.players[player.name] = {
                x: player.x ,
                y: player.y ,
                a: player.a ,
                m: player.m
            };
            
            if(!this.map[player.m]) this.map[player.m] = {};
            this.map[player.m][player.name] = {
                x: player.x ,
                y: player.y ,
                a: player.a 
            };
        }
    }

    del(player) {
        if(this.players[player.name]) {
            delete this.map[player.m][player.name];
            delete this.players[player.name];
        }
    }

    disconnect(player) {
        if(this.players[player.name]) {
            player.s.to(player.m).broadcast("disconnected" , player.name);
            delete this.map[player.m][player.name];
            delete this.players[player.name];
        }
    }
}

module.exports = {
    Player,
    Players
};