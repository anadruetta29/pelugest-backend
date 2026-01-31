import { Request, Response } from 'express';
import { ClientService } from './service';
import { CreateClientDTO } from '../../../domain';

export class ClientController {
    constructor(
        private readonly clientService: ClientService
    ){}

    create = async (req: Request, res: Response) => {}

    update = async (req: Request, res: Response) => {}
    delete = async (req: Request, res: Response) => {}
    findById = async (req: Request, res: Response) => {}

}