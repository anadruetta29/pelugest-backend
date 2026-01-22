import { Router } from "express";
import { AuthRoute } from "../app/auth/route";

export class AppRouter {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoute.routes);

        return router;
    }
}