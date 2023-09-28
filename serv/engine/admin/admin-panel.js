module.exports = (player , world, maps) => {
    //emit to admin players to open admin panel
    player.s.emit("admin-panel", true);

    //on new-map
    player.s.on("new-map" , (data) => {
        player.s.emit("new-map" , maps(data.name, data.zone , data.size , data.tile_size , data.default_terrain));
    });

    //getting all maps on world
    player.s.on("get-all-maps" , ()=> player.s.emit("get-all-maps" , maps.getMaps()));

    //teleport to diferent map
    player.s.on("teleport" , (map) => {
        
    });
};