import { Request, Response } from 'express';
import { ServiceService } from './service';
import { CreateServicetDTO } from '../../../domain/dto/service/create';
import { UpdateServiceDTO } from '../../../domain/dto/service/update';
import { DeleteServiceDTO } from '../../../domain/dto/service/delete';
import { FindByIdDTO } from '../../../domain/dto/service/find-by-id';
import { GetAllByStatusDTO } from '../../../domain';
import { GetAllClientsDTO } from '../../../domain/dto/client/get-all';

export class ServiceController {
    constructor(
        private readonly serviceService: ServiceService
    ) {}

    create = async (req: Request, res: Response) => {
        const [_, dto] = CreateServicetDTO.create(req.body);

        const result = await this.serviceService.create(dto!);

        return res.status(201).json(result);
    }

    update = async (req: Request, res: Response) => {
        const [_, dto] = UpdateServiceDTO.create({
            id: req.params.id,
            ...req.body  
        });

        const result = await this.serviceService.update(dto!);

        return res.status(200).json(result);
    }

    delete = async (req: Request, res: Response) => {
        const [_, dto] = DeleteServiceDTO.create(req.body);

        const result = await this.serviceService.delete(dto!);

        return res.status(200).json(result);
    }

    findById = async (req: Request, res: Response) => {
        const [_, dto] = FindByIdDTO.create({ id: req.params.id });

        const result = await this.serviceService.findById(dto!);

        return res.status(200).json(result);
    }

    getAll = async(req: Request, res: Response) => {
        const [_, dto] = GetAllClientsDTO.create();

        const result = await this.serviceService.getAll(dto!);

        return res.status(200).json(result);
    }

    getAllByStatus = async(req: Request, res: Response) => {
        const { statusId } = req.params;

        const [_, dto] = GetAllByStatusDTO.create({ statusId });

        const result = await this.serviceService.getAllByStatus(dto!);

        return res.status(200).json(result);

    }
}
