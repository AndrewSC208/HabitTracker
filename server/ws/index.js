import SocketIO from 'socket.io';

class User {
    constructor(_id, _socket_id) {
        this.id = _id;
        this.socket_id = _socket_id;
    }
}

export default class Ws {
    constructor(_server) {
        this.clients = new Map();

        this.server = new SocketIO(_server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false
        });

        this.server.on('connection', (socket) => {
        
            socket.on('connectUser', user => {

                this.setClient(user.id, socket.id);
            });

            // socket.on('disconnect', () => {
            //     this.deleteClient(socket.id);
            // });
        });
    }

    setClient(id, socket_id) {
        const user = new User(id, socket_id);

        this.clients.set(socket_id, user);

        console.log('CLIENT CONNECTED, AND USER UPDATED: ', user);
    }

    getCient() {

    }

    deleteClient(socket_id) {
        this.clients.delete(id);
        console.log('CLIENT DISCONNECTED: ', id);
    }
}

