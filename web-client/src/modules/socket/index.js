import io from 'socket.io-client';

export default class Ws {
    constructor(_user) {
        this.socket = this.connect();
        this.socket.on('connection', (socket) => {
            socket.emit('connectUser', _user);
            socket.on('diconnect', () => {
                this.disconnect();
            });

            socket.on('userConnected', (user) => {
                this.connected(user);
            });
        });
    }
    
    connect() {
        // todo: Add the user obj to this connect method 
        // so that we know the user is authenticated
        this.socket = io.connect('http://localhost:4112')
    }

    connected(user) {
        console.log('user connected', user);
    }

    disconnect() {
        console.log('CLIENT HAD DISCONNECTED');
    }
}