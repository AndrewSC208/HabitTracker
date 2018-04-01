import express      from 'express';
import logger       from 'morgan';
import helmet       from 'helmet';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import bodyParser   from 'body-parser';
import cors         from 'express-cors';

class App {
    constructor(config, api) {
        this._config  = config;
        this._api     = api;
        this.express  = express();
        this.setup(this.express);
    }

    setup(app) {
        app.use(express.static(this._config.PUBLIC_PATH));
        app.use(logger(this._config.LOGGER_TYPE));
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

        app.use('/api', this._api);
    }
}

export const setup = (config, api) => {
    return new App(config, api);
}

