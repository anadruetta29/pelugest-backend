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
        try {
            const [error, dto] = CreateServiceDTO.create(req.body);

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.serviceService.create(dto!);

            return res.status(201).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const [error, dto] = UpdateServiceDTO.create({
                id: req.params.id,
                ...req.body  
            });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.serviceService.update(dto!);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const [error, dto] = DeleteServiceDTO.create(req.body);

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.serviceService.delete(dto!);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const [error, dto] = FindServiceByIdDTO.create({ id: req.params.id });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.serviceService.findById(dto!);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    }

    getAll = async(req: Request, res: Response) => {
        try {
            const [error, dto] = GetAllServicesDTO.create();

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.serviceService.getAll(dto!);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    }

    getAllByStatus = async(req: Request, res: Response) => {
        try {
            const { statusId } = req.params;

            const [error, dto] = GetAllServicesByStatusDTO.create({ statusId });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.serviceService.getAllByStatus(dto!);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    }

    deactivate = async(req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const [error, dto] = DeactivateServiceDTO.create({ id });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.serviceService.deactivate(dto!);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    }
}