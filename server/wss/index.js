import * as Actions from './actions';

export const setup = (WebSocket, server) => {
    const wss = new WebSocket.Server({server});

    wss.on('connection', (ws, req) => {
        Actions.connection(ws, req);

        wss.on('message', (msg) => {
            Actions.message(msg);
        });

        wss.send('something');
    });

    return wss;
}


