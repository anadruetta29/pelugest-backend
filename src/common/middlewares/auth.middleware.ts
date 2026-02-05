import { authHelper } from './../../config/helpers/AuthHelper';
import { Request, Response, NextFunction } from "express";
import { ErrorHandler, ErrorTypeName } from "../../common";

export class AuthMiddleware {
  static validateSession(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ErrorHandler(ErrorTypeName.UNAUTHORIZED);
    }

    const token = authHelper.validateToken(authHeader);

    if (!token) {
      throw new ErrorHandler(ErrorTypeName.UNAUTHORIZED);
    }

    const userId = authHelper.getSubject(token);

    req.authUser = { id: userId };
    next();
  }
}
