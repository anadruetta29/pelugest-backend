import { Router } from "express"
import { ClientController } from "./controller";
import { ClientService } from "./service";

export class ClientRoute {
    static get routes(): Router {
        const router = Router()
        const service = new ClientService()
        const controller = new ClientController(service)

        router.post('/create', (req, res) => controller.create(req, res));       
        router.post('/update', (req, res) => controller.update(req, res));
        router.post('/delete', (req, res) => controller.delete(req, res));
        router.get('/find-by-id', (req, res) => controller.findById(req, res));

        return router
    }
}