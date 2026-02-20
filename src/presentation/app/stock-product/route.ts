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
            '/find-by-product/:productId',
            AuthMiddleware.validateSession,
            (req, res) => controller.findByProduct(req, res)
        );

        router.get(
            '/get-all',
            AuthMiddleware.validateSession,
            (req, res) => controller.getAll(req, res)
        );

        return router;
    }
}