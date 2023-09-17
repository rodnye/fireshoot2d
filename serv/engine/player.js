module.exports = {
    Player : class {
        constructor(id , name ,s, x , y , a , m){
            this.id = id;
            this.name = name;
            this.s = s;
            this.x = x;
            this.y = y;
            this.a = a;
            this.m = m;
        }

        get(){
            return {
                id: this.id,
                name: this.name,
                x: this.x,
                y: this.y,
                a: this.a,
                m: this.m
            }
        }
    },
    Players : class {
        constructor(){
            this.players = {};
        }

        add(player) {
            this.players[player.name] = player.get();
        }
    }
}