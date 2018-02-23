import path         from 'path';
import express      from 'express';
import logger       from 'morgan';
import http         from 'http';
import helmet       from 'helmet';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import bodyParser   from 'body-parser';
import cors         from 'express-cors';
import SocketIO     from 'socket.io';
/*
 *  CONFIG OBJECT
 */
import mongoose from './config/mongoose';
import Config   from './config/server';
/*
 *  API
 */
import Api from './api'
/*
 * START EXPRESS:
 */
let app    = express();
let server = http.Server(app);
let io     = new SocketIO(server);
// Todo: move this
let users   = [];
let sockets = {};
/*
 * CONFIG EXPRESS GLOBALS & MIDDLEWARE:
 */
app.use(express.static(Config.PUBLIC_PATH));
app.use(logger(Config.LOGGER_TYPE));
app.use(helmet());
app.use(cookieParser());
app.use(responseTime());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    allowedOrigins: [
        'http://localhost:3000'
    ]
}))
/*
 * API ROUTES
 */
app.use('/api', Api);
/*
 * VIEW ROUTES -> Setup HBS to render index.html that will hold react app
 */
//app.use('/', index,);
/*
 *  SOCKET METHODS: todo - move this
 */
io.on('connection', (client) => {
    console.log('CLIENT CONNECTED');

    client.on('disconnect', () => {
        console.log('CLIENT DISCONNECTED');
    })
});
/*
 * SET PORT TO LISTEN ON
 */
server.listen(Config.PORT, () => {
    console.log(`Server is running on: ${Config.PORT}`)
})

export default app;