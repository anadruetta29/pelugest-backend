import { Router } from "express";
import { AuthMiddleware } from '../../../common';
import { ProductController } from './controller';
import { ProductService } from './service';

export class ProductRoute {
    static get routes(): Router {
        const router = Router();
        const service = new ProductService();
        const controller = new ProductController(service);

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
            '/search',
            AuthMiddleware.validateSession,
            controller.search
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
            '/status/:statusId',
            AuthMiddleware.validateSession,
            controller.getAllByStatus
        );

        router.patch(
            '/:id/deactivate',
            AuthMiddleware.validateSession,
            controller.deactivate
        );

        return router;
    }
}