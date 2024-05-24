import express, { Application } from 'express';
import cors from 'cors';
import log from './tools/log';
import compression from 'compression';
import helmet from 'helmet';
import initDatabase from './database/init.model';
import config from './config/global.config';
import adminRouter from './routes/admin.route';

const corsOptions = {
    origin: ['http://localhost:3000']
};

initDatabase().then(() => {
    const app: Application = express();
    const router: express.Router = express.Router();
    router.use('/api/admin', adminRouter);
    router.get('/', ((req, res) => {
        res.json('Hello from server!!!');
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(compression());
    app.use(helmet());
    app.use(cors(corsOptions));
    app.use('/', router);

    app.listen(config.port, () => {
        log(`Express service is now online at port:${config.port}.`);
    });

}).catch((err) => {
    console.log(err);
});
