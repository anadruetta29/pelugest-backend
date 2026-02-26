import { Router } from "express";
import { AuthMiddleware } from '../../../common';
import { ClientService } from '../client/service';
import { ClientController } from '../client/controller';
import { AppointmentDetailController } from "./controller";
import { AppointmentDetailService } from "./service";

export class AppointmentDetailRoute {
    static get routes(): Router {
        const router = Router();
        const service = new AppointmentDetailService();
        const controller = new AppointmentDetailController(service);

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
            '/appointment/:appointmentId',
            AuthMiddleware.validateSession,
            controller.findByAppointmentId
        );

        return router;
    }
}