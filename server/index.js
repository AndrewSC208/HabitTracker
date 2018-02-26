import http from 'http';

import Config   from './config/server';
import Api      from './api';
import App      from './app';
import Ws       from './ws';
// TODO: change this to match the rest
//import Dao from './dao';
import mongoose from './config/mongoose';

const app    = new App(Config, Api);
const server = http.Server(app.express);
const ws     = new Ws(server);

server.listen(Config.PORT, () => {
    console.log(`Server is running on: ${Config.PORT}`)
});

export {
    app,
    server,
    ws
};