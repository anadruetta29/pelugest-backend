import { Request, Response, NextFunction } from 'express';
import { AuthService } from './service';
import { RegisterUserDTO } from '../../../domain/dto/auth/register';
import { LoginUserDTO } from '../../../domain/dto/auth/login';

export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, dto] = RegisterUserDTO.create(req.body);

            if (error) {
                return res.status(400).json({ error });
            }

            const user = await this.authService.register(dto!);

            return res.status(201).json(user);
        } 
        catch (error) {
            next(error);
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, dto] = LoginUserDTO.create(req.body);

            if (error) {
                return res.status(400).json({ error });
            }

            const tokenData = await this.authService.login(dto!);

            return res.status(200).json(tokenData);
        } 
        catch (error) {
            next(error);
        }
    }

    auth = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json({ error: "Authorization header missing" });
            }

            const session = await this.authService.auth(authHeader);

            return res.status(200).json(session);
        } 
        catch (error) {
            next(error);
        }
    }
}