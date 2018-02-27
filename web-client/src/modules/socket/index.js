import io from 'socket.io-client';

let ws; 

class Ws {
    constructor(_user) {
        this.connected = false;
        this.socket = this.connect();
        this.socket.on('connection', (socket) => {
            socket.emit('connectUser', _user);
            
            socket.on('userConnected', (res) => {
                this.connected(res);
            });

            socket.on('diconnect', () => {
                this.disconnect();
            });
        });
    }
    
    connect() {
        // todo: Add the user obj to this connect method 
        // so that we know the user is authenticated
        this.socket = io.connect('http://localhost:4112')
    }

    connected(user) {
        this.connected = true;

    }

    disconnect() {
        console.log('CLIENT HAD DISCONNECTED');
    }
}

const initWs = (user) => {
    return new Promise((resolve, reject) => {
        ws = new Ws(user);

        // todo: add some retry logic here
        if(ws.connected) {
            resolve(ws);
        }
        
        reject('SOCKET DID NOT CONNECT');
    });
}

export {
    ws,
    initWs
}