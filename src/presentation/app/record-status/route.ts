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
            '/find-by-name/:name',
            AuthMiddleware.validateSession,
            (req, res) => controller.findByName(req, res)
        );

        return router;
    }
}
