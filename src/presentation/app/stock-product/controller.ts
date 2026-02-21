import { Request, Response } from 'express';
import { StockProductService } from './service';
import { GetAllStockProductsDTO } from '../../../domain/dto/stock-product/get-all';
import { CreateStockProductDTO } from '../../../domain/dto/stock-product/create';
import { UpdateStockProductDTO } from '../../../domain/dto/stock-product/update';
import { DeleteStockProductDTO } from '../../../domain/dto/stock-product/delete';
import { FindStockProductByProductDTO } from '../../../domain/dto/stock-product/find-by-product';

export class StockProductController {

    constructor(
        private readonly stockProductService: StockProductService
    ) {}

    create = async (req: Request, res: Response) => {
        try {
            const [error, dto] = CreateStockProductDTO.create(req.body);

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.stockProductService.create(dto!);

            return res.status(201).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const [error, dto] = UpdateStockProductDTO.create({
                id: req.params.id,
                ...req.body
            });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.stockProductService.update(dto!);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const [error, dto] = DeleteStockProductDTO.create({
                id: req.params.id
            });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.stockProductService.delete(dto!);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };

    findById = async (req: Request, res: Response) => {
        try {
            const result = await this.stockProductService.findById(req.params.id);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };

    findByProduct = async (req: Request, res: Response) => {
        try {
            const [error, dto] = FindStockProductByProductDTO.create({
                productId: req.params.productId
            });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.stockProductService.findByProduct(dto!);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };

    getAll = async (req: Request, res: Response) => {
        try {
            const [error, dto] = GetAllStockProductsDTO.create();

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.stockProductService.getAll(dto!);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };
}