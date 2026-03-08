import { Router } from "express";
import { AuthMiddleware } from "../../../common";
import { AppointmentController } from "./controller";
import { AppointmentService } from "./service";

export class AppointmentRoute {
    static get routes(): Router {

        const router = Router();
        const service = new AppointmentService();
        const controller = new AppointmentController(service);

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
            '/',
            AuthMiddleware.validateSession,
            controller.getAll
        );
        
        router.get(
            '/search',
            AuthMiddleware.validateSession,
            controller.search
        );
        
        router.get(
            '/status/:statusId',
            AuthMiddleware.validateSession,
            controller.getAllByStatus
        );

        router.get(
            '/:id/details',
            AuthMiddleware.validateSession,
            controller.findDetailsByAppointmentId
        );
        
        router.get(
            '/:id',
            AuthMiddleware.validateSession,
            controller.findById
        );

        router.patch(
            "/details/:detailId/status",
            AuthMiddleware.validateSession,
            controller.toggleAppointmentDetailStatus
        );

        router.patch(
            '/:id/start',
            AuthMiddleware.validateSession,
            controller.start
        );

        router.patch(
            '/:id/attend',
            AuthMiddleware.validateSession,
            controller.attend
        );

        router.patch(
            '/:id/miss',
            AuthMiddleware.validateSession,
            controller.miss
        );

        router.patch(
            '/:id/cancel',
            AuthMiddleware.validateSession,
            controller.cancel
        );
        return router;
    }
}