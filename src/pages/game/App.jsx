
import { useRef, useEffect } from "react"

import GameRenderer from "./gl/GameRenderer"
import { initSocket, getSocket } from "./socket/socket"

export default function GamePage () {
    
    useEffect(() => {
        initSocket();
    }, [])
    
    // Render
    return (
        <div>
            <GameRenderer
                ratio={19/10}
                height={300}
                resolution={1}
                
                play={false}
            />
        </div>
    )
    
}