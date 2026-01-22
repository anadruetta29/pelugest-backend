import { Router } from "express"
import { AuthService } from "./service"
import { AuthController } from "./controller"

export class AuthRoute {
    static get routes(): Router {
        const router = Router()
        const service = new AuthService()
        const controller = new AuthController(service)

        router.post('/register', controller.register);       
        router.post('/login', controller.login);

        return router
    }
}