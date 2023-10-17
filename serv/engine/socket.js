const G = require("./socket/g.js");
const S = require("./socket/s.js");
const Player = require("./player.js");
const World = require("./world.js");
const Maps = require("./map.js");
const config = require("../../config.js");
const { User, Pj } = require(config.SERV + "/helpers/db.js");
const uid = require(config.SERV + "/helpers/uid.js");
let spos = config.START_POS;
const adminPanel = require("./admin/admin-panel.js");

module.exports = async (io) => {
    const g = G(io);
    //loading maps
    let maps = new Maps(config.DB + "/maps");
    maps.load();
    //generating world
    let world = new World(g);
    g.of("/auth").on("connection", async (socket) => {
        const s = S(socket);

        s.on("ping", data => {
            s.emit("pong", 0);
        });

        s.on("login", async (data) => {
            if (!data || !data.password || !data.username) return s.emit("login", { status: false, data: "MISSING_FIELDS" })
            const user = await User.findOne({
                where: { username: data.username, password: data.password }
            });
            if (user) {
                return s.emit("login", { token: user.user_id, status: true });
            } else {
                const exist = await User.findOne({
                    where: { username: data.username }
                });
                if (exist) return s.emit("login", { status: false, data: "USER_EXISTS_WRONG_PASS" });
                else {
                    const create = await User.create({

                        username: data.username,
                        password: data.password,
                        user_id: uid.alphanum(8)

                    });
                    if (create) return s.emit("login", { token: create.user_id, status: true });
                    else return s.emit("login", { status: false, data: "DATABASE_ERROR" });
                }
            }
        });
    });
    const w = g.of("/world");
    w.on("connection", async (socket) => {
        const s = S(socket);
        //checking if user is on session storage , if not reject
        let user_id = "xgkHNGNM";
        if (!s.request.session || !s.request.session.passport || !s.request.session.passport.user) user_id = "pkZI01f3";//return s.disconnect();
        if (s.handshake.query.token) user_id = s.handshake.query.token;
        console.log("Your User ID is", user_id);
        spos.name = "pj_" + uid.num(5);
        spos.user_id = user_id;
        spos.lvl = 1;
        spos.xp = 0;

        s.on("ping", data => {
            s.emit("pong", 0);
        });

        const user = await User.findOne({
            where: { user_id: user_id }
        });
        if (!user) {
            s.emit("error", {status: false, data: "NOT_IN_DATABASE" });
            return s.disconnect();
        }

        //creating player if not exist in db and loading if exists
        let pj;
        try {
            const [_pj, cpj] = await Pj.findOrCreate({
                where: { user_id },
                defaults: spos
            });
            pj = _pj || cpj;
        } catch (err) { console.log(err) }
        //creating pj to onrun db
        let player = new Player(pj.user_id, pj.name, s, pj.x, pj.y, pj.z, pj.a, pj.m, pj.lvl, pj.xp, pj.acclevel);
        player.config();
        player.sendPlayerData();

        //retrieving map data if user havent , returning true if user have the map updated
        s.on("get_map", (data) => {
            if (data == maps.get(pj.m).vhash) {
                s.emit("get_map", true);
            } else s.emit("get_map", maps.get(pj.m));
        });

        //retrieving players data
        s.on("get_players", (data) => {
            world.addPlayer(player); //adding player to world
        });

        //if player is admin send admin panel
        if (player.admin) adminPanel(player, world, maps);

    });

    world.loop(30); //world loop - set to 30fps
}