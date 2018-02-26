import express      from 'express';
import logger       from 'morgan';
import helmet       from 'helmet';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import bodyParser   from 'body-parser';
import cors         from 'express-cors';

export default class App {
    constructor(_config, _api) {
        this.config  = _config;
        this.api     = _api;
        this.express = express();
        this.setup(this.express);
    }

    setup(app) {
        app.use(express.static(this.config.PUBLIC_PATH));
        app.use(logger(this.config.LOGGER_TYPE));
        app.use(helmet());
        app.use(cookieParser());
        app.use(responseTime());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(cors({
            allowedOrigins: [
                'http://localhost:3000'
            ]
        }));

        app.use('/api', this.api);
    }
}

