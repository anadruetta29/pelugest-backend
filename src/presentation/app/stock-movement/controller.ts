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
        const [_, dto] = CreateStockMovementDTO.create(req.body);

        const userId = req.authUser?.id;

        if (!userId) {
            return res.status(401).json({ error: "Usuario no autenticado en la sesión" });
        }

        const result = await this.stockMovementService.create(dto!, userId);

        return res.status(201).json(result);
    }

    update = async (req: Request, res: Response) => {
        const [_, dto] = UpdateStockMovementDTO.create({
            id: req.params.id,
            ...req.body
        });

        const userId = req.authUser?.id;

        if (!userId) {
            return res.status(401).json({ error: "Usuario no autenticado en la sesión" });
        }

        const result = await this.stockMovementService.update(dto!, userId);

        return res.status(200).json(result);
    }

    
    delete = async (req: Request, res: Response) => {
        const [_, dto] = DeleteStockMovementDTO.create({
            id: req.params.id
        });

        const result = await this.stockMovementService.delete(dto!);

        return res.status(200).json(result);
    }

    findById = async (req: Request, res: Response) => {
        const result = await this.stockMovementService.findById(req.params.id);

        return res.status(200).json(result);
    }

    getAllByProduct = async (req: Request, res: Response) => {
        const [_, dto] = GetAllStockMovementsByProductDTO.create({
            productId: req.params.productId
        });

        const result = await this.stockMovementService.getAllByProduct(dto!);

        return res.status(200).json(result);
    }

    getAllByUser = async (req: Request, res: Response) => {
        const [_, dto] = GetAllStockMovementsByUserDTO.create({
            userId: req.params.userId
        });

        const result = await this.stockMovementService.getAllByUser(dto!);

        return res.status(200).json(result);
    }

    getAll = async (req: Request, res: Response) => {
        const [_, dto] = GetAllStockMovementsDTO.create();

        const result = await this.stockMovementService.getAll(dto!);

        return res.status(200).json(result);
    }
}