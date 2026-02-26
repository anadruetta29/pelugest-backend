import { Request, Response, NextFunction } from "express";
import { CreateAppointmentDetailDTO } from "../../../domain/dto/appointment-detail/create";
import { UpdateAppointmentDetailDTO } from "../../../domain/dto/appointment-detail/update";
import { FindAppointmentDetailByIdDTO } from "../../../domain/dto/appointment-detail/find-by-id";
import { DeleteAppointmentDetailDTO } from "../../../domain/dto/appointment-detail/delete";
import { FindAppointmentDetailsByAppointmentIdDTO } from "../../../domain/dto/appointment-detail/find-by-appointment-id";
import { AppointmentDetailService } from "./service";


export class AppointmentDetailController {

    constructor(
        private readonly appointmentDetailService: AppointmentDetailService
    ) {}

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, dto] = CreateAppointmentDetailDTO.create(req.body);

            if (error) return res.status(400).json({ error });

            const result = await this.appointmentDetailService.create(dto!);

            return res.status(201).json(result);
        } 
        catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, dto] = UpdateAppointmentDetailDTO.create({
                id: req.params.id,
                ...req.body
            });

            if (error) return res.status(400).json({ error });

            const result = await this.appointmentDetailService.update(dto!);

            return res.status(200).json(result);
        } 
        catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, dto] = DeleteAppointmentDetailDTO.create(req.body);

            if (error) return res.status(400).json({ error });

            const result = await this.appointmentDetailService.delete(dto!);

            return res.status(200).json(result);
        } 
        catch (error) {
            next(error);
        }
    };

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, dto] = FindAppointmentDetailByIdDTO.create({ id: req.params.id });
            
            if (error) return res.status(400).json({ error });
        
            const result = await this.appointmentDetailService.findById(dto!);
        
            return res.status(200).json(result);
        } 
        catch (error) {
            next(error);
        }
    };

    findByAppointmentId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, dto] = FindAppointmentDetailsByAppointmentIdDTO.create({
                appointmentId: req.params.appointmentId
            });

            if (error) return res.status(400).json({ error });

            const result = await this.appointmentDetailService.findByAppointmentId(dto!);

            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
}