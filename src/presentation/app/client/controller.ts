import { Request, Response } from 'express';
import { ClientService } from './service';
import { CreateClientDTO, DeleteClientDTO, FindClientByIdDTO, GetAllClientsByStatusDTO, UpdateClientDTO } from '../../../domain';
import { DeactivateClientDTO } from '../../../domain/dto/client/deactivate';
import { GetAllClientsDTO } from '../../../domain/dto/client/get-all';

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
        const [_, dto] = FindClientByIdDTO.create({ id: req.params.id });

        const result = await this.clientService.findById(dto!);

        return res.status(200).json(result);
    }

    getAll = async(req: Request, res: Response) => {
        const [_, dto] = GetAllClientsDTO.create();

        const result = await this.clientService.getAll(dto!);

        return res.status(200).json(result);
    }

    getAllByStatus = async(req: Request, res: Response) => {
        const { statusId } = req.params;

        const [_, dto] = GetAllClientsByStatusDTO.create({ statusId });

        const result = await this.clientService.getAllByStatus(dto!);

        return res.status(200).json(result);

    }

    deactivate = async(req: Request, res: Response) => {
        const { id } = req.params;

        const [_, dto] = DeactivateClientDTO.create({ id });

        const result = await this.clientService.deactivate(dto!);

        return res.status(200).json(result);
    }
}
