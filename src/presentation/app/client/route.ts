import { authHelper } from './../../../config/helpers/AuthHelper';
import { Router } from "express"
import { AuthHelper } from "../../../config";
import { AuthMiddleware } from '../../../common';
import { ClientService } from '../client/service';
import { ClientController } from '../client/controller';

export class ClientRoute {
    static get routes(): Router {
        const router = Router();
        const service = new ClientService();
        const controller = new ClientController(service);

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
            '/delete',
            AuthMiddleware.validateSession,
            (req, res) => controller.delete(req, res)
        );

        router.get(
            '/find-by-id/:id',
            AuthMiddleware.validateSession,
            (req, res) => controller.findById(req, res)
        );

        router.get(
            '/get-all-by-status/:statusId',
            AuthMiddleware.validateSession,
            (req, res) => controller.getAllByStatus(req, res)
        );

        return router;
    }
}
