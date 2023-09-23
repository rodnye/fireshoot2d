
import io from 'socket.io-client'

let socket = null;

// Socket Setup
export const initSocket = () => {
    socket = io("/");
    
    // Events
    socket.on("connect", (data) => {
        alert("te has conectado");
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