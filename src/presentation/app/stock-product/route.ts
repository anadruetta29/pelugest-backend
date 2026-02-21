import { Router } from "express";
import { AuthMiddleware } from "../../../common";
import { StockProductService } from "./service";
import { StockProductController } from "./controller";

export class StockProductRoute {
    static get routes(): Router {

        const router = Router();
        const service = new StockProductService();
        const controller = new StockProductController(service);

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
            controller.findByProduct
        );

        return router;
    }
}