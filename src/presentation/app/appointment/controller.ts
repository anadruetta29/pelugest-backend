import { NextFunction, Request, Response } from 'express';
import { AppointmentService } from './service';
import { GetAllStockProductsDTO } from '../../../domain/dto/stock-product/get-all';
import { CreateStockProductDTO } from '../../../domain/dto/stock-product/create';
import { UpdateStockProductDTO } from '../../../domain/dto/stock-product/update';
import { DeleteStockProductDTO } from '../../../domain/dto/stock-product/delete';
import { FindStockProductByProductDTO } from '../../../domain/dto/stock-product/find-by-product';
import { CreateAppointmentDTO } from '../../../domain/dto/appointment/create';
import { FindAppointmentByIdDTO } from '../../../domain/dto/appointment/find-by-id';
import { GetAllAppointmentsDTO } from '../../../domain/dto/appointment/get-all';
import { UpdateAppointmentDTO } from '../../../domain/dto/appointment/update';
import { DeleteAppointmentDTO } from '../../../domain/dto/appointment/delete';
import { GetAllAppointmentsByStatusDTO } from '../../../domain/dto/appointment/get-all-by-status';
import { ChangeAppointmentStatusDTO } from "../../../domain/dto/appointment/change-appointment-status";
import { FindAppointmentDetailsByAppointmentIdDTO } from '../../../domain/dto/appointment-detail/find-by-appointment-id';
import { ToggleAppointmentDetailStatusDTO } from '../../../domain/dto/appointment-detail/toggle-status';

export class AppointmentController {

    constructor(
        private readonly appointmentService: AppointmentService
    ) {}

    create = async (req: Request, res: Response) => {
        try {
            const [error, dto] = CreateAppointmentDTO.create(req.body);

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.appointmentService.create(dto!);

            return res.status(201).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };

    update = async (req: Request, res: Response) => {
    try {

        console.log("===== UPDATE APPOINTMENT REQUEST =====");
        console.log("PARAM ID:", req.params.id);
        console.log("BODY:", JSON.stringify(req.body, null, 2));

        const [error, dto] = UpdateAppointmentDTO.create({
            id: req.params.id,
            ...req.body
        });

        if (error) {
            console.log("DTO ERROR:", error);
            return res.status(400).json({ message: error });
        }

        console.log("DTO CREATED:", JSON.stringify(dto, null, 2));

        const result = await this.appointmentService.update(dto!);

        console.log("UPDATE SUCCESS:", result);

        return res.status(200).json(result);
    } 
    catch (error: any) {

        console.error("UPDATE CONTROLLER ERROR:");
        console.error(error);

        return res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
};

    delete = async (req: Request, res: Response) => {
        try {
            const [error, dto] = DeleteAppointmentDTO.create({
                id: req.params.id
            });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.appointmentService.delete(dto!);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };

    findById = async (req: Request, res: Response) => {
        try {
            const [error, dto] = FindAppointmentByIdDTO.create({ id: req.params.id });
                        
            if (error) return res.status(400).json({ error });
            
            const result = await this.appointmentService.findById(dto!);
            
            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };

    getAll = async (req: Request, res: Response) => {
        try {
            const [error, dto] = GetAllAppointmentsDTO.create();

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.appointmentService.getAll(dto!);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };

    getAllByStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { statusId } = req.params;

            const [error, dto] = GetAllAppointmentsByStatusDTO.create({ statusId });

            if (error) return res.status(400).json({ error });

            const result = await this.appointmentService.getAllByStatus(dto!);

            return res.status(200).json(result);
        } 
        catch (error) {
            next(error);
        }
    }

    start = async (req: Request, res: Response) => {
        try {

            const [error, dto] = ChangeAppointmentStatusDTO.create({
                id: req.params.id
            });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.appointmentService.start(dto!);

            return res.status(200).json(result);

        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal server error" });
        }
    };

    attend = async (req: Request, res: Response) => {
        try {

            const [error, dto] = ChangeAppointmentStatusDTO.create({
                id: req.params.id
            });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.appointmentService.attend(dto!);

            return res.status(200).json(result);

        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal server error" });
        }
    };

    miss = async (req: Request, res: Response) => {
        try {

            const [error, dto] = ChangeAppointmentStatusDTO.create({
                id: req.params.id
            });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.appointmentService.miss(dto!);

            return res.status(200).json(result);

        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal server error" });
        }
    };

    cancel = async (req: Request, res: Response) => {
        try {

            const [error, dto] = ChangeAppointmentStatusDTO.create({
                id: req.params.id
            });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.appointmentService.cancel(dto!);

            return res.status(200).json(result);

        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal server error" });
        }
    };

    findDetailsByAppointmentId = async (req: Request, res: Response) => {
        try {

            const [error, dto] = FindAppointmentDetailsByAppointmentIdDTO.create({
                appointmentId: req.params.id
            });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.appointmentService.findDetailsByAppointmentId(dto!);

            return res.status(200).json(result);

        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal server error" });
        }
    };

    toggleAppointmentDetailStatus = async (req: Request, res: Response) => {
        try {

            const [error, dto] = ToggleAppointmentDetailStatusDTO.create({
                appointmentDetailId: req.params.detailId,
                recordStatusId: req.body.recordStatusId
            });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.appointmentService.toggleAppointmentDetailStatus(dto!);

            return res.status(200).json(result);

        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal server error" });
        }
    };
    
}