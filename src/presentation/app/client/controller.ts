import { Request, Response } from 'express';
import { ClientService } from './service';
import { CreateClientDTO, DeleteClientDTO, FindByIdDTO, GetAllByStatusDTO, UpdateClientDTO } from '../../../domain';

export class ClientController {
    constructor(
        private readonly clientService: ClientService
    ) {}

    create = async (req: Request, res: Response) => {
        const [_, dto] = CreateClientDTO.create(req.body);

        const result = await this.clientService.create(dto!);

        return res.status(201).json(result);
    }

    update = async (req: Request, res: Response) => {
        const [_, dto] = UpdateClientDTO.create({
            id: req.params.id,
            ...req.body  
        });

        const result = await this.clientService.update(dto!);

        return res.status(200).json(result);
    }

    delete = async (req: Request, res: Response) => {
        const [_, dto] = DeleteClientDTO.create(req.body);

        const result = await this.clientService.delete(dto!);

        return res.status(200).json(result);
    }

    findById = async (req: Request, res: Response) => {
        const [_, dto] = FindByIdDTO.create({ id: req.params.id });

        const result = await this.clientService.findById(dto!);

        return res.status(200).json(result);
    }

    getAllByStatus = async(req: Request, res: Response) => {
        const [_, dto] = GetAllByStatusDTO.create(req.body);

        const result = await this.clientService.getAllByStatus(dto!);

        return res.status(200).json(result);

    }
}
