import { Router } from "express";
import { UserController } from "./controller";
import { AuthMiddleware } from "../../../common";
import { UserService } from "./service";

export class UserRoute {
    static get routes(): Router {

        const router = Router();
        const service = new UserService();
        const controller = new UserController(service);

        router.get(
            '/role/:roleName',
            AuthMiddleware.validateSession,
            controller.getAllByRoleName
        );

        return router;
    }
}