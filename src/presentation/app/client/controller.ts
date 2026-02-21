import { Request, Response, NextFunction } from 'express';
import { ClientService } from './service';
import { CreateClientDTO, DeleteClientDTO, FindClientByIdDTO, GetAllClientsByStatusDTO, UpdateClientDTO } from '../../../domain';
import { DeactivateClientDTO } from '../../../domain/dto/client/deactivate';
import { GetAllClientsDTO } from '../../../domain/dto/client/get-all';

export class ClientController {
    constructor(
        private readonly clientService: ClientService
    ) {}

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, dto] = CreateClientDTO.create(req.body);

            if (error) return res.status(400).json({ error });

            const result = await this.clientService.create(dto!);

            return res.status(201).json(result);
        } 
        catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, dto] = UpdateClientDTO.create({
                id: req.params.id,
                ...req.body
            });

            if (error) return res.status(400).json({ error });

            const result = await this.clientService.update(dto!);

            return res.status(200).json(result);
        } 
        catch (error) {
            next(error);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, dto] = DeleteClientDTO.create(req.body);

            if (error) return res.status(400).json({ error });

            const result = await this.clientService.delete(dto!);

            return res.status(200).json(result);
        } 
        catch (error) {
            next(error);
        }
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, dto] = FindClientByIdDTO.create({ id: req.params.id });

            if (error) return res.status(400).json({ error });

            const result = await this.clientService.findById(dto!);

            return res.status(200).json(result);
        } 
        catch (error) {
            next(error);
        }
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, dto] = GetAllClientsDTO.create();

            if (error) return res.status(400).json({ error });

            const result = await this.clientService.getAll(dto!);

            return res.status(200).json(result);
        } 
        catch (error) {
            next(error);
        }
    }

    getAllByStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { statusId } = req.params;

            const [error, dto] = GetAllClientsByStatusDTO.create({ statusId });

            if (error) return res.status(400).json({ error });

            const result = await this.clientService.getAllByStatus(dto!);

            return res.status(200).json(result);
        } 
        catch (error) {
            next(error);
        }
    }

    deactivate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            const [error, dto] = DeactivateClientDTO.create({ id });

            if (error) return res.status(400).json({ error });

            const result = await this.clientService.deactivate(dto!);

            return res.status(200).json(result);
        } 
        catch (error) {
            next(error);
        }
    }
}