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
            '/create',
            AuthMiddleware.validateSession,
            (req, res) => controller.create(req, res)
        );

        router.put(  
            '/update/:id',
            AuthMiddleware.validateSession,
            (req, res) => controller.update(req, res)
        );

        router.delete(
            '/delete/:id',
            AuthMiddleware.validateSession,
            (req, res) => controller.delete(req, res)
        );

        router.get(
            '/find-by-id/:id',
            AuthMiddleware.validateSession,
            (req, res) => controller.findById(req, res)
        );

        router.get(
            '/get-all',
            AuthMiddleware.validateSession,
            (req, res) => controller.getAll(req, res)
        );

        router.get(
            '/get-all-by-product/:productId',
            AuthMiddleware.validateSession,
            (req, res) => controller.getAllByProduct(req, res)
        );

        router.get(
            '/get-all-by-user/:userId',
            AuthMiddleware.validateSession,
            (req, res) => controller.getAllByUser(req, res)
        );

        return router;
    }
}