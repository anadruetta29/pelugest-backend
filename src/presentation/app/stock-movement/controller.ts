import { Request, Response } from 'express';
import { CreateStockMovementDTO } from '../../../domain/dto/stock-movement/create';
import { GetAllStockMovementsDTO } from '../../../domain/dto/stock-movement/get-all';
import { DeleteStockMovementDTO } from '../../../domain/dto/stock-movement/delete';
import { GetAllStockMovementsByProductDTO } from '../../../domain/dto/stock-movement/get-all-by-product';
import { GetAllStockMovementsByUserDTO } from '../../../domain/dto/stock-movement/get-all-by-user';
import { StockMovementService } from './service';
import { UpdateStockMovementDTO } from '../../../domain/dto/stock-movement/update';

export class StockMovementController {

    constructor(
        private readonly stockMovementService: StockMovementService
    ) {}

    create = async (req: Request, res: Response) => {
        try {
            const [error, dto] = CreateStockMovementDTO.create(req.body);

            if (error) {
                return res.status(400).json({ message: error });
            }

            const userId = req.authUser?.id;

            if (!userId) {
                return res.status(401).json({ message: "Usuario no autenticado en la sesión" });
            }

            const result = await this.stockMovementService.create(dto!, userId);

            return res.status(201).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const [error, dto] = UpdateStockMovementDTO.create({
                id: req.params.id,
                ...req.body
            });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const userId = req.authUser?.id;

            if (!userId) {
                return res.status(401).json({ message: "Usuario no autenticado en la sesión" });
            }

            const result = await this.stockMovementService.update(dto!, userId);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const [error, dto] = DeleteStockMovementDTO.create({
                id: req.params.id
            });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.stockMovementService.delete(dto!);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };

    findById = async (req: Request, res: Response) => {
        try {
            const result = await this.stockMovementService.findById(req.params.id);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };

    getAllByProduct = async (req: Request, res: Response) => {
        try {
            const [error, dto] = GetAllStockMovementsByProductDTO.create({
                productId: req.params.productId
            });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.stockMovementService.getAllByProduct(dto!);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };

    getAllByUser = async (req: Request, res: Response) => {
        try {
            const [error, dto] = GetAllStockMovementsByUserDTO.create({
                userId: req.params.userId
            });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.stockMovementService.getAllByUser(dto!);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };

    getAll = async (req: Request, res: Response) => {
        try {
            const [error, dto] = GetAllStockMovementsDTO.create();

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.stockMovementService.getAll(dto!);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };
}