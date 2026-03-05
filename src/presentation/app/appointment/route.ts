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
            '/status/:statusId',
            AuthMiddleware.validateSession,
            controller.getAllByStatus
        );
        
        router.get(
            '/:id',
            AuthMiddleware.validateSession,
            controller.findById
        );

        return router;
    }
}