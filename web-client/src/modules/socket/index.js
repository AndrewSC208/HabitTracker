import io from 'socket.io-client';

const connectWs = (user) => {
    return new Promise((resolve, reject) => {
        // TODO: auth the user when connecting to socket
        const ws = new Ws();

        ws.evt.on('connect', socket => {
            ws.evt.emit('connectUser', user);

            resolve(ws);
        });
    });
}

class Ws {
    constructor() {
        this.evt = io('http://localhost:4112');

        this.evt.on('userConnected', user => {
            console.log('user connected', user);
        });
    }
}

class WorkoutNsp {
    constructor() {
        
    }
}

export { connectWs }