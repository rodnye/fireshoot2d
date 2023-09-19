const fs = require("fs");

class Maps {
    constructor() {
        this.maps = {};
    }

    load(route) {
        const _maps = fs.readdirSync(route);
        if (_maps.length > 0) {
            for (let map of _maps) {
                this.maps[map.replace(".json", "")] = JSON.parse(fs.readFileSync(route + "/" + map, "utf-8"));
            }
        }
        console.log("Loaded " + _maps.length + " world maps.");
    }

    get(map) {
        if (map && this.maps[map]) return this.maps[map];
        else if (map) return [];
        else return this.maps;
    }
}

module.exports = Maps;