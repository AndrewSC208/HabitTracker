import SocketIO from 'socket.io';

class User {
    constructor(_id, _email, _socket_id) {
        this.id        = _id;
        this.email     = _email;
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
                this.setClient(user, socket.id);
            });

            // socket.on('disconnect', () => {
            //     this.deleteClient(socket.id);
            // });
        });
    }

    setClient(user, socket_id) {
        const { _id, email } = user;
        const connectedUser = new User(_id, email, socket_id);

        this.clients.set(socket_id, connectedUser);
        this.server.emit('userConnected', connectedUser);

        console.log('clients: ', this.clients);
    }

    deleteClient(socket_id) {
        this.clients.delete(id);
        console.log('CLIENT DISCONNECTED: ', id);
    }
}

