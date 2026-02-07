import { Request, Response } from 'express';
import { ServiceService } from './service';
import { CreateServiceDTO } from '../../../domain/dto/service/create';
import { UpdateServiceDTO } from '../../../domain/dto/service/update';
import { DeleteServiceDTO } from '../../../domain/dto/service/delete';
import { FindServiceByIdDTO } from '../../../domain/dto/service/find-by-id';
import { GetAllServicesDTO } from '../../../domain/dto/service/get-all';
import { GetAllServicesByStatusDTO } from '../../../domain/dto/service/get-all-by-status';
import { DeactivateServiceDTO } from '../../../domain/dto/service/deactivate';

export class ServiceController {
    constructor(
        private readonly serviceService: ServiceService
    ) {}

    create = async (req: Request, res: Response) => {
        const [_, dto] = CreateServiceDTO.create(req.body);

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
        const [_, dto] = FindServiceByIdDTO.create({ id: req.params.id });

        const result = await this.serviceService.findById(dto!);

        return res.status(200).json(result);
    }

    getAll = async(req: Request, res: Response) => {
        const [_, dto] = GetAllServicesDTO.create();

        const result = await this.serviceService.getAll(dto!);

        return res.status(200).json(result);
    }

    getAllByStatus = async(req: Request, res: Response) => {
        const { statusId } = req.params;

        const [_, dto] = GetAllServicesByStatusDTO.create({ statusId });

        const result = await this.serviceService.getAllByStatus(dto!);

        return res.status(200).json(result);

    }

     deactivate = async(req: Request, res: Response) => {
        const { id } = req.params;

        const [_, dto] = DeactivateServiceDTO.create({ id });

        const result = await this.serviceService.deactivate(dto!);

        return res.status(200).json(result);
    }
}
