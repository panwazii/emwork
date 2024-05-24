import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';


export interface UserAttribute {
    id?: string;
    fname?: string;
    lname?: string;
    //1
    color?: boolean;
    long?: boolean;
    tilted?: boolean;
    reflex?: boolean;
    //2
    sign?: number;
    line?: number;
    way?: number;
    //3
    practical?: boolean;

    pass1?: boolean;
    pass2?: boolean;
    pass3?: boolean;

    created_at?: Date;
}

export interface UserAttributeCreation extends Optional<UserAttribute, 'id'> { }

class UserModel extends Model<UserAttribute, UserAttributeCreation> implements UserAttribute {
    declare id: string;

    declare fname: string;

    declare lname: string;

    //1
    declare color: boolean;
    declare long: boolean;
    declare tilted: boolean;
    declare reflex: boolean;
    //2
    declare sign: number;
    declare line: number;
    declare way: number;
    //3
    declare practical: boolean;

    declare pass1: boolean;
    declare pass2: boolean;
    declare pass3: boolean;

    declare created_at: Date;
}

export const initUserModel = (connection: Sequelize) => {
    UserModel.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            fname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            //1
            color: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            long: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            tilted: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            reflex: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            //2
            sign: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            line: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            way: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            //3
            practical: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },

            pass1: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            pass2: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            pass3: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },

            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize: connection,
            timestamps: false,
            tableName: 'users',
        },
    );
};

export default UserModel;
