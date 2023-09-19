
import "../styles/game-view.css"
import {
    Renderer, 
    Container, 
    Ticker
} from "pixi.js"

// Screen dimensions
let screen_width = Math.max(screen.width, screen.height);
let screen_height = Math.min(screen.width, screen.height);
let screen_ratio = screen_width / screen_height;

// Game renderer configuration
const RESOLUTION = 1;
const GAME_RATIO = 19/10;
const GAME_HEIGHT = 300 * RESOLUTION; // game height
const GAME_WIDTH = GAME_HEIGHT * GAME_RATIO; // game width
const GAME_PIXEL = GAME_HEIGHT / 100; // game pixel


// create pixi application
export default function createGameRenderer () {
    
    const renderer = new Renderer({
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
    });
    const scene = new Container();
    const ticker = new Ticker();
    
    renderer.view.className = "game-view";
    
    return {
        scene,
        renderer,
        ticker,
        values: {
            GAME_PIXEL,
            GAME_WIDTH,
            GAME_HEIGHT,
            RESOLUTION,
        }
    }
}