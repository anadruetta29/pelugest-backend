import { Router } from "express";

export class AppRouter {
    static get routes(): Router {
        const router = Router();

        router.use('/api/login')

        return router;
    }
}