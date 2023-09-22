
import {createContext} from 'react';
import io from 'socket.io-client';

// Context
export const SocketContext = createContext();

// Context Provider
export const SocketProvider = ({children}) => {
    const socket = io("/");
    
    // Events
    socket.on("connect", (data) => {
        alert("te has conectado");
    }); 
    socket.onAny((event, data) => {
        console.log("ws/" + event + "=> ", data)
    })
    
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};