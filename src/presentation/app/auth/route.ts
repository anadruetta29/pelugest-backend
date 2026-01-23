import { Router } from "express"
import { AuthService } from "./service"
import { AuthController } from "./controller"

export class AuthRoute {
    static get routes(): Router {
        const router = Router()
        const service = new AuthService()
        const controller = new AuthController(service)

        router.post('/register', (req, res) => controller.register(req, res));       
        router.post('/login', (req, res) => controller.login(req, res));
        router.get('/', (req, res) => controller.auth(req, res))

        return router
    }
}