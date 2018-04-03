import * as Actions from './actions';

export const setup = (WebSocket, server) => {
    const wss = new WebSocket.Server({server});

    wss.on('connection', (ws, req) => {
        Actions.Connection(ws, req);

        ws.on('message', (msg) => {
            Actions.Message(msg);
        });

        ws.send('something dsfsdfsdfsdfsdfsdf');
    });

    return wss;
}


