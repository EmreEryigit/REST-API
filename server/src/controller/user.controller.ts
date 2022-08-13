import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";
import { omit } from "lodash";

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
) {
    try {
        const user = await createUser(req.body);
        // return res.send(omit(user.toJSON(), "password"));
        return res.send(user);
    } catch (error: any) {
        logger.error(error);
        console.log(error);
        return res.status(409).send(error.message);
    }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
    return res.send(res.locals.user);
}
