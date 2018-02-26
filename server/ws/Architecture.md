// SOCKET REDUCER DESIGN:
1. This first version does not use namespaces, or chatrooms
2. I am using a basic reducer pattern, create four channels, map actions on type, and pass to Dao layer for type.

// MESSAGE MODEL
const payload = {
     type: 'workout',
     payload: { match the db model }
};

// CLIENT ACTIONS DISPATCHED:
socket.emit('create', payload);
socket.emit('read', payload);
socket.emit('update', payload);
socket.emit('delete', payload);

// SERVER ACTION REDUCER:
socket.on('create', (payload) => {
    const {type} = payload;

    switch(type) {
        case 'workout':
            Dao.createWorkout(payload);
            return;

        case 'post':
            Dao.createPost(payload);
            return;

        case 'message':
            Dao.createMessage(payload);
            return;

        default:
            console.log('ERROR: did not find action');
            return undefined;
    }
});

socket.on('read', (payload) => {
    const {type} = payload;

    switch(type) {
        case 'workout':
            Dao.readWorkout(payload);
            return;

        case 'post':
            Dao.readPost(payload);
            return;

        case 'message':
            Dao.readMessage(payload);
            return;

        default:
            console.log('ERROR: did not find action');
            return undefined;
    }
});

socket.on('update', (payload) => {
    const {type} = payload;

    switch(type) {
        case 'workout':
            Dao.updateWorkout(payload);
            return;

        case 'post':
            Dao.updatePost(payload);
            return;

        case 'message':
            Dao.updateMessage(payload);
            return;

        default:
            console.log('ERROR: did not find action');
            return undefined;
    }
});

socket.on('delete', (payload) => {
    const {type} = payload;

    switch(type) {
        case 'workout':
            Dao.deleteWorkout(payload);
            return;

        case 'post':
            Dao.deletePost(payload);
            return;

        case 'message':
            Dao.deleteMessage(payload);
            return;

        default:
            console.log('ERROR: did not find action');
            return undefined;
    }
});

// SOCKET ENTITIY TYPE DESIGN:
1. There is a dramatically lower amount of boiler plate code that needs to be written.
2. It's clean, simple, files can be broken up, and structured per entity type.

// MESSAGE MODEL:
const payload = {
     type: 'workout',
     payload: { match the db model }
};

// CLIENT EVENTS:
socket.emit('creatWorkout', payload);
socket.emit('readWorkout', payload);
socket.emit('updateWorkout', payload);
socket.emit('deleteWorkout', payload);

// SERVER EVENTS:
socket.on('creatWorkout', payload => {
    Dao.createWorkout(payload);
});

socket.on('readWorkout', payload => {
    Dao.readWorkout(payload);
});

socket.on('updateWorkout', payload => {
    Dao.updateWorkout(payload);
});

socket.on('deleteWorkout', payload => {
    Dao.deleteWorkout(payload);
});