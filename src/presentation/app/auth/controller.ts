import { Request, Response } from 'express';
import { AuthService } from './service';
import { RegisterUserDTO } from '../../../domain/dto/auth/register';
import { LoginUserDTO } from '../../../domain/dto/auth/login';
import { AuthUserDTO } from '../../../domain/dto/auth/auth';

export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    register = async (req: Request, res: Response) => {
       
        const [_, dto] = RegisterUserDTO.create(req.body);

        const user = await this.authService.register(dto!);
        
        return res.status(201).json(user);
    }

    login = async (req: Request, res: Response) => {

        const [_, dto] = LoginUserDTO.create(req.body);
        
        const tokenData = await this.authService.login(dto!);
        
        return res.status(200).json(tokenData);
    } 

    auth = async (req: Request, res: Response) => {
        const [_, dto] = AuthUserDTO.create(req.body);

        const session = await this.authService.auth(dto!);
        
        return res.status(200).json(session);
    }

}