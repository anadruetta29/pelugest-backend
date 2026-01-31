import { Router } from "express";
import { AuthRoute } from "../app/auth/route";
import { ClientRoute } from "../app/client/route";

export class AppRouter {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoute.routes);
        router.use('/api/clients', ClientRoute.routes)

        return router;
    }
}