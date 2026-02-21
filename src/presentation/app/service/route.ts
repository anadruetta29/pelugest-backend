import { Router } from "express";
import { AuthMiddleware } from '../../../common';
import { ServiceController } from './controller';
import { ServiceService } from './service';

export class ServiceRoute {
    static get routes(): Router {
        const router = Router();
        const service = new ServiceService();
        const controller = new ServiceController(service);

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