import { Router } from "express";
import { AuthRoute } from "../app/auth/route";
import { ClientRoute } from "../app/client/route";
import { RecordStatusRoute } from "../app/record-status/route";
import { ServiceRoute } from "../app/service/route";

export class AppRouter {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoute.routes);
        router.use('/api/clients', ClientRoute.routes);
        router.use('/api/record-status', RecordStatusRoute.routes);
        router.use('/api/services', ServiceRoute.routes)
        return router;
    }
}