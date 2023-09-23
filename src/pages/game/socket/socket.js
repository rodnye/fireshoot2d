
import io from 'socket.io-client'

let socket = null;

// Socket Setup
export const initSocket = () => {
    socket = io("/");

    // Events
    socket.on("connect", (data) => {
        alert("te has conectado");
    });

    //guardar en el storage los mapas (cree una variable de prueba)
    let maps = {};
    //datos del jugador
    let player = {};
    socket.on("player_data", (data) => {
        player = data;
        //pedir el mapa actual
        socket.emit("get_map", { vhash: maps[player.pos.m] ? maps[player.pos.m].vhash : null }); //buscamos si tenemos el mapa en el storage y enviamos el vhash si existe , sino null
    });

    //obtener los datos del mapa 
    socket.on("get_map", (data) => {
        /* Llega un  objeto asi, guardarlo en el storage con el indice de busqueda que sea el "name"
        maps{
            default_terrain: "g_1",
            name: "m_1",
            size: { x: 100, y: 100 },
            terrain: {},
            tile_size: 32,
            vhash: "dj28Hs9289",
            zone: "preparation_camp"
        }*/

        //dibujar mapa

        //cuando termine de dibujar el mapa...
        socket.emit("get_players" , true); //pedir los players del mapa actual
    });

    //obtener los players del mapa
    socket.on("get_players" , (data) => {
        /* viene un objeto asi :
        {brrr : {
            name: brrr,
            pos: {x,y,a,m},
            status: {hp, ar , en},
            lvl: 1
        }...}*/

        //dibujarlos en el mapa
    });

    //cuando entra al mapa un nuevo jugador
    socket.on("new_pj" , (data) => {
        /* viene un objeto asi :
        {
            name: brrr,
            pos: {x,y,a,m},
            status: {hp, ar , en},
            lvl: 1
        }*/

        //dibujarlo
    });

    //cada cambio en el mapa o juador llega a este evento
    socket.on("changes", (data) => {
        //TODO
    });


    socket.onAny((event, data) => {
        console.log("ws/" + event + "=> ", data)
    })

    // DEBUG only!
    window.socket = socket;
}

// 
export const getSocket = () => {
    return socket
}