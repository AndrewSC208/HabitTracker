import io from 'socket.io-client';

let socket;

const connectSocket = () => {
    // todo - move this to config, and env files
    socket = io.connect('http://localhost:4112');
} 

const disconnectSocket = () => {
    socket.close();
}

export {
    connectSocket,
    disconnectSocket
}

