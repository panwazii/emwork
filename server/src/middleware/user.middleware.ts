import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/global.config';
import { log } from 'console';

export const authValid = (req: Request, res: Response, next: NextFunction) => {
    try {
        const Token = req.headers.authorization;
        if (!req.headers.authorization) {
            return res.status(403).json({ code: 403, desc: 'unauthorized' });
        }

        if (Token !== 'undefined') {
            const User = jwt.verify(Token!, config.security.salt);
            req.body.credentials = User;
            next();
        }
    } catch (error) {
        console.log(error);

        res.status(403).json({ code: 403, desc: 'unknow error' });
    }

};

export const checkBodyEmpty = (errMessage: any) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        res.json(errMessage);
    } else {
        next();
    }
};

