const fs = require("fs");
const config = require("../../config.js");
const uid = require(config.SERV + "/helpers/uid.js");

class Maps {
    constructor(route) {
        this.maps = {};
        this.mapNames = [];
        this.route = route;
    }

    getMaps() {
        return this.mapNames;
    }

    load() {
        const _maps = fs.readdirSync(this.route);
        if (_maps.length > 0) {
            for (let map of _maps) {
                this.mapNames.push(map.replace(".json", ""));
                this.maps[map.replace(".json", "")] = JSON.parse(fs.readFileSync(this.route + "/" + map, "utf-8"));
            }
        }
        console.log("Loaded " + _maps.length + " world maps.");
    }
    add(name, zone , size , tile_size , default_terrain){
        if(this.maps.includes(name)) return false;
        const map = {
            name,
            zone,
            size,
            tile_size,
            default_terrain,
            terrain: {},
            vhash: uid.alphanum(10)
        };
        fs.writeFileSync(this.route + "/" + name + ".json" , JSON.stringify(map), "utf-8");
        this.maps[name] = map;
        return true;
    }

    get(map) {
        if (map && this.maps[map]) return this.maps[map];
        else if (map) return {};
        else return this.maps;
    }
}

module.exports = Maps;