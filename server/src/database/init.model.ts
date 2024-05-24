import { Dialect, Sequelize } from 'sequelize';
import yn from 'yn';
import debug from 'debug';
import config from '../config/global.config';
//models
import { initUserModel } from './models/user.model';

import log from '../tools/log';

const logDB = debug('server:db');
const logFunc = config.database.logging ? ((sql: string) => logDB(sql)) : false;

const dbName = config.database.dbname;
const dbUser = config.database.username;
const dbHost = config.database.host;
const dbDriver = config.database.driver as Dialect;
const dbPassword = config.database.password;



const sequelizeOptions: any = {
    host: dbHost,
    dialect: dbDriver,
    logging: logFunc,
    // dialectOptions: {
    //     ssl: {
    //         require: yn(config.database.dialectOptions.ssl.require),
    //         rejectUnauthorized: yn(config.database.dialectOptions.ssl.rejectUnauthorized)
    //     }
    // },
    ...config.database.sequelizeOptions,
};

export const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, sequelizeOptions);

sequelizeConnection.authenticate().then(() => {
    log('Connected to database');
}).catch((err) => {
    log(`${err}`);
    console.log(err);
});

const initDatabase = async () => {
    const models = [
        //Admin
        initUserModel,

    ];
    models.forEach((initFunction) => {
        initFunction(sequelizeConnection);
    });

    // UserModel.hasMany(PositionModel, { as: 'user', foreignKey: 'user_id', onDelete: 'CASCADE' });
    // PositionModel.belongsTo(UserModel, { as: 'user', foreignKey: 'user_id' });


    if (yn(config.database.dropAndCreateNew)) {
        log("Drop status :", config.database.dropAndCreateNew);
        log(sequelizeConnection.models);
        await sequelizeConnection.sync({ force: true });
        if (yn(config.database.insertInitData)) {
            // log("Start seeding ADMIN");
            // await initAdminSeed();
        }
    } else {
        await sequelizeConnection.sync({ alter: config.database.syncOption.alter });
    }
};

export default initDatabase;
