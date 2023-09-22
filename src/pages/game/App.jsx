
import { useRef, useEffect } from "react"

import createGameRenderer from "./gl/GameRenderer.js"
import { SocketProvider } from "./socket/SocketContext"

export default function GamePage () {
    const gameContainerRef = useRef(null);
    
    // Mount game renderer
    useEffect(() => {
        const {renderer, container, ticker} = createGameRenderer();
        gameContainerRef.current.appendChild(renderer.view);
    }, []);
    
    // Render
    return (
        <SocketProvider>
            <div 
                className="game-container" 
                ref={gameContainerRef}
            />
        </SocketProvider>
    )
}