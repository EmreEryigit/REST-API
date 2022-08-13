import { CookieOptions, Request, Response } from "express";
import {
    createSession,
    findSession,
    updateSession,
} from "../service/session.service";
import {
    findAndUpdateUser,
    getGoogleOauthTokens,
    getGoogleUser,
    validatePassword,
} from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
import log from "../utils/logger";
import jwt from "jsonwebtoken";
import { UserDocument } from "../models/user.model";

const accessTokenCookieOptions: CookieOptions = {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "lax",
    secure: false,
};
const refreshTokenCookieOptions: CookieOptions = {
    ...accessTokenCookieOptions,
    maxAge: 3.154e10, // 1 year
};

export async function createUserSessionHandler(req: Request, res: Response) {
    // validate password
    const user = await validatePassword(req.body);
    if (!user) {
        return res.status(401).send("Invalid email or password");
    }
    // create a session
    const session = await createSession(user._id, req.get("user-agent") || "");
    // create an access token
    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get<string>("accessTokenTtl") }
    );

    // create a refresh token
    const refreshToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get<string>("refreshTokenTtl") }
    );

    // cookies
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    // return access and refresh tokens
    return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;
    const sessions = await findSession({ user: userId, valid: true });
    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;
    await updateSession({ _id: sessionId }, { valid: false });
    return res.send({
        accessToken: null,
        refreshToken: null,
    });
}

export async function googleOauthHandler(req: Request, res: Response) {
    try {
        // get the code from query string
        const code = req.query.code as string;
        // get the id and access token with the code
        const { id_token, access_token } = await getGoogleOauthTokens({ code });

        // get user with tokens
        const googleUser = getGoogleUser({ id_token, access_token }); //jwt.decode(id_token)
        if (!(await googleUser).verified_email) {
            return res.status(403).send("Google account is not verified");
        }
        // upsert user
        const user = (await findAndUpdateUser(
            {
                email: (await googleUser).email,
            },
            {
                email: (await googleUser).email,
                name: (await googleUser).name,
                picture: (await googleUser).picture,
            },
            {
                upsert: true,
                new: true,
            }
        )) as UserDocument;
        // create a session

        const session = await createSession(
            user._id,
            req.get("user-agent") || ""
        );
        // create an access token
        const accessToken = signJwt(
            // @ts-ignore
            { ...user!.toJSON(), session: session._id },
            { expiresIn: config.get<string>("accessTokenTtl") } // 15 mins
        );

        // create a refresh token
        const refreshToken = signJwt(
            // @ts-ignore
            { ...user!.toJSON(), session: session._id },
            { expiresIn: config.get<string>("refreshTokenTtl") } // 1 year
        );

        // set a cookie and redirect
        // cookies
        res.cookie("accessToken", accessToken, accessTokenCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
        // redirect
        res.redirect(config.get("origin"));
    } catch (e) {
        log.error(e, "Failed to fetch tokens");
        return res.redirect(config.get("origin"));
    }
}
