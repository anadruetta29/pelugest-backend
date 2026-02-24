import { Router } from 'express';
import { AuthMiddleware } from '../../../common';
import { RecordStatusService } from './service';
import { RecordStatusController } from './controller';

export class RecordStatusRoute {
    static get routes(): Router {
        const router = Router();
        const service = new RecordStatusService();
        const controller = new RecordStatusController(service);

        router.get(
            '/name/:name',
            AuthMiddleware.validateSession,
            controller.findByName
        );

        return router;
    }
}