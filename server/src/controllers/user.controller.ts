import Sequelize, { Op } from 'sequelize';
import UserModel, { UserAttribute } from '../database/models/user.model';
import config from '../config/global.config';
import { log } from '../tools/log';

class UserController {

    public static async getAllUsers(limit: number, offset: number) {
        return UserModel.findAndCountAll({
            limit,
            offset,
            raw: true
        });
    }

    public static async getAllUsersRaw() {
        return UserModel.findAll({
            raw: true
        });
    }

    public static async create(data: any) {

        // const packet: UserAttribute = {
        //     fname: data.fname,
        //     lname: data.lname,
        //     //1
        //     color: data.color,
        //     long: data.long,
        //     tilted: data.tilted,
        //     reflex: data.reflex,
        //     //2
        //     sign: data.sign,
        //     line: data.line,
        //     way: data.way,
        //     //3
        //     practical: data.practical,
        // };

        return UserModel.create(data)
    }

    public static async getByQuery(limit: number, page: number, query: any) {
        const offset = limit * page;
        const conditions: any = {};

        if (query.fname !== '') {
            conditions.fname = query.fname
        }

        if (query.lname !== '') {
            conditions.lname = query.lname
        }

        return UserModel.findAndCountAll({
            limit,
            offset,
            where: conditions,
        });
    }

    public static async getByID(userID: string) {
        return UserModel.findOne({
            where: {
                id: userID,
            },
            raw: true,
        });
    }

    public static async destroy(id: string) {
        return UserModel.destroy({
            where: {
                id,
            },
        })
    }

    public static async update(id: string, data: any) {
        return UserModel.update(
            data
            , {
                where: {
                    id
                },
            }).then(() => true)
            .catch(() => false);
    }

}

export default UserController;
