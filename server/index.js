// Env
import Config    from './config/server';

// libraries
import Express from 'express';
import Http    from 'http';
import Ws      from 'ws';

// services
import * as dao from './dao';
import * as api from './api';
import * as app from './app';
import * as www from './www';
import * as wss from './wss';

// classes
import * as Routes from './api/routes';
import * as Models from './dao/models';

// setup
const Dao    = dao.setup(Config, Models);
const Api    = api.setup(Express, Routes);
const App    = app.setup(Config, Api);
const Server = www.setup(Http, App.express);
const Wss    = wss.setup(Ws, Server);

// startup
Server.listen(Config.PORT, () => {
    console.log(`SERVER RUNNING ON: ${Config.PORT}`)
});

export { 
    Dao,
    Api,
    App, 
    Server,
    Wss,
};
