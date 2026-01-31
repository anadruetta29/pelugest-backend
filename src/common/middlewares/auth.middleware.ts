import { authHelper } from './../../config/helpers/AuthHelper';
import { Request, Response, NextFunction } from "express";
import { ErrorHandler, ErrorTypeName } from "../../common";

export class AuthMiddleware {

    static validateSession(req: Request, res: Response, next: NextFunction) {

        const authHeader = req.headers.authorization;

        const token = authHelper.validateToken(authHeader);

        if (!token) {
            throw new ErrorHandler(ErrorTypeName.UNAUTHORIZED);
        }

        const email = authHelper.getSubject(token);

        req.body.authUser = {
            email
        };

        next();
    }
}
