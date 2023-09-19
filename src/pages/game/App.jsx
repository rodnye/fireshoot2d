
import { useRef, useEffect } from "react"

import createGameRenderer from "./gl/GameRenderer.js"
import socket from "./socket/socket"

export default function GamePage () {
    const gameContainerRef = useRef(null);
    
    // Mount game renderer
    useEffect(() => {
        const {renderer, container, ticker} = createGameRenderer();
        gameContainerRef.current.appendChild(renderer.view);
    }, []);
    
    // Render
    return (
        <div>
            <div 
                className="game-container" 
                ref={gameContainerRef}
            />
        </div>
    )
}