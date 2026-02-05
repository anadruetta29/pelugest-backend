import { Router } from "express";
import { AuthRoute } from "../app/auth/route";
import { ClientRoute } from "../app/client/route";
import { RecordStatusRoute } from "../app/record-status/route";

export class AppRouter {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoute.routes);
        router.use('/api/clients', ClientRoute.routes);
        router.use('/api/record-status', RecordStatusRoute.routes);
        return router;
    }
}