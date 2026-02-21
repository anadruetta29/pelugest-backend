import { Router } from "express";
import { AuthMiddleware } from "../../../common";
import { StockMovementController } from "./controller";
import { StockMovementService } from "./service";

export class StockMovementRoute {
    static get routes(): Router {

        const router = Router();
        const service = new StockMovementService();
        const controller = new StockMovementController(service);

        router.post(
            '/',
            AuthMiddleware.validateSession,
            controller.create
        );

        router.put(
            '/:id',
            AuthMiddleware.validateSession,
            controller.update
        );

        router.delete(
            '/:id',
            AuthMiddleware.validateSession,
            controller.delete
        );

        router.get(
            '/:id',
            AuthMiddleware.validateSession,
            controller.findById
        );

        router.get(
            '/',
            AuthMiddleware.validateSession,
            controller.getAll
        );

        router.get(
            '/product/:productId',
            AuthMiddleware.validateSession,
            controller.getAllByProduct
        );

        router.get(
            '/user/:userId',
            AuthMiddleware.validateSession,
            controller.getAllByUser
        );

        return router;
    }
}