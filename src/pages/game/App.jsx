
import createGameRenderer from "./gl/GameRenderer.js"
import { useRef, useEffect } from "react"


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