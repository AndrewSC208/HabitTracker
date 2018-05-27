let socket = {};

const open = (evt, resolve) => {
    socket = evt.target;
    resolve('connected');

    socket.send('This is a message from the client');
}

const error = (evt, resolve) => {
    resolve('error');

    console.log('SOME ERROR HAPPEND WITH THE SOCKETS: ', evt);
}

const message = (evt, resolve) => {
    console.log('MESSAGE RECEIVED FROM THE SERVER: ', evt.data);
    /**
     * I NEED TO FIGURE OUT HOW I AM GOING TO MAP A STREAM OF MESSAGES NOW
     * OBSERVABLES AT THIS POINT MIGHT BE THE ONLY ANSWER
     */
}

const close = (evt, resolve) => {
    resolve('close');

    console.log('WEBSOCKET WAS CLOSED: ', evt);
}

const connect = (user) => {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:4112');
        ws.onopen    = (evt) => open(evt, resolve);
        ws.onerror   = (evt) => error(evt, resolve);
        ws.onmessage = (evt) => message(evt, resolve);
        ws.onclose   = (evt) => close(evt, resolve);
    });
};

/**
 * I DON'T WANT TO EXPOSE THE SOCKET GLOBALLY,
 * ONLY EXPOSE THE REQUIRED METHODS TO CONNECT, DISCONNECT, AND SEND MESSAGES
 */
const disconnect = () => {}

const send = (message) => {
    socket.send(JSON.stringify(message));
}

export { connect, disconnect, send }