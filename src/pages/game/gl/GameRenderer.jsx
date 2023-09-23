
import "../styles/game-view.css"
import {useRef, useState, useEffect} from "react"
import {
    Renderer, 
    Container, 
    Ticker,
} from "pixi.js" 

export default function GameRenderer ({
    ratio,
    height,
    resolution = 1,
    
    scene,
    onLoop = ()=>{},
    play,
}) {
    const canvasRef = useRef(null);
    const rendererRef = useRef(null);
    const tickerRef = useRef(null);
    
    const canvas_height = height * resolution;
    const canvas_width = canvas_height * ratio;
    
    //
    // Startup
    //
    useEffect(() => {
        // Renderer
        const _renderer = new Renderer({
            view: canvasRef.current,
            width: canvas_width,
            height: canvas_height,
        });
        rendererRef.current = _renderer;
        
        // Renderer loop
        const _ticker = new Ticker();
        _ticker.add(() => {
            onLoop();
            _renderer.render(scene);
        });
        tickerRef.current = _ticker; 
    }, []);
    
    //
    // Loop for rendering
    //
    useEffect(() => {
        if (play) tickerRef.current.play();
        else tickerRef.current.stop();
    }, [play])
    
    
    return (
        <canvas 
            ref={canvasRef}
            className="game-view"
        />
    )
}