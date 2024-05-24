import express from 'express';
import { createErrCodeJSON, createUnknownErrCodeJSON, HttpStatusCode } from '../tools/lib';
import log from '../tools/log';
import UserController from '../controllers/user.controller';
import multer from 'multer';

const adminRouter: express.Router = express.Router();
const errorCode = createErrCodeJSON();
const unknownErrorCode = createUnknownErrCodeJSON();

const multerUpload = multer();

adminRouter.post('/create', async (req, res) => {
    try {

        // AdminController.getByID(AdminId).then((user) => {
        //     if (user) {
        //         res.status(200).json({
        //             code: 200, admin: {
        //                 id: user.id,
        //                 fname: user.fname,
        //                 lname: user.lname,
        //                 email: user.email,
        //                 tel: user.tel,
        //                 avatar: user.avatar,
        //                 status: user.status,
        //                 created_at: user.created_at,
        //                 update_at: user.update_at
        //             }
        //         });
        //     } else {
        //         res.json(errorCode(HttpStatusCode.NOT_FOUND, 'DATA', 'NOTFOUND'));
        //     }
        // });
        const data = {
            fname: req.body.fname,
            lname: req.body.lname,
            //1
            color: req.body.color,
            long: req.body.long,
            tilted: req.body.tilted,
            reflex: req.body.reflex,
            //2
            sign: req.body.sign,
            line: req.body.line,
            way: req.body.way,
            //3
            practical: req.body.practical,
        }
        if (req.body.sign !== null) {
            data.sign = Number(req.body.sign)
        }
        if (req.body.line !== null) {
            data.line = Number(req.body.line)
        }
        if (req.body.way !== null) {
            data.way = Number(req.body.way)
        }

        let pass1 = null;
        let pass2 = null;
        let pass3 = null;

        if (data.color === true && data.long === true && data.tilted === true && data.reflex === true) {
            pass1 = true
        } else if (data.color !== null || data.long !== null || data.tilted !== null || data.reflex !== null) {
            if (data.color === false || data.long === false || data.tilted === false || data.reflex === false) {
                pass1 = false
            }
        }

        if (data.sign !== null && data.line !== null && data.way !== null) {
            const temp = Number(data.sign) + Number(data.line) + Number(data.way)
            const percent = 150 * 0.8;
            if (temp >= percent) {
                pass2 = true
            }
            else {
                pass2 = false
            }
        }

        pass3 = req.body.practical;

        await UserController.create({ ...data, pass1, pass2, pass3 });
        return res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(500).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER, error as string));
    }
});

adminRouter.get('/getAllResult', async (req, res) => {
    try {
        const query = {
            fname: String(req.query.fname),
            lname: String(req.query.lname),
        }
        const limit = Number(req.query.limit);
        let page = Number(req.query.page);
        if (page != 0) {
            page = page - 1
        }
        const data = await UserController.getByQuery(limit, page, query)
        res.status(200).json({
            code: 200, data: data!.rows, total_pages: Math.ceil(data!.count / limit)
        });

    } catch (error) {
        log(error)
        res.status(500).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER, error as string));
    }
});

adminRouter.get('/getById', async (req, res) => {
    try {

        const data = await UserController.getByID(String(req.query.id))
        res.status(200).json({ data: data });

    } catch (error) {
        log(error)
        res.status(500).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER, error as string));
    }
});

adminRouter.delete('/delete', async (req, res) => {
    try {
        await UserController.destroy(String(req.query.id))
        res.status(200).json();

    } catch (error) {
        res.status(500).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER, error as string));
    }
});

export default adminRouter;




