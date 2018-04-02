import WebSocket from 'ws';

const connect = (user) => {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket('http://localhost:4112');

        ws.on('open', (evt) => {
            console.log('what is the evt: ', evt);
        });

        resolve(ws);
    });
}

export { connect }