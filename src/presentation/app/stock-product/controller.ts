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
        const [_, dto] = CreateStockProductDTO.create(req.body);

        const result = await this.stockProductService.create(dto!);

        return res.status(201).json(result);
    }

    update = async (req: Request, res: Response) => {
        const [_, dto] = UpdateStockProductDTO.create({
            id: req.params.id,
            ...req.body
        });

        const result = await this.stockProductService.update(dto!);

        return res.status(200).json(result);
    }

    delete = async (req: Request, res: Response) => {
        const [_, dto] = DeleteStockProductDTO.create({
            id: req.params.id
        });

        const result = await this.stockProductService.delete(dto!);

        return res.status(200).json(result);
    }

    findById = async (req: Request, res: Response) => {
        const result = await this.stockProductService.findById(req.params.id);

        return res.status(200).json(result);
    }

    findByProduct = async (req: Request, res: Response) => {
        const [_, dto] = FindStockProductByProductDTO.create({
            productId: req.params.productId
        });

        const result = await this.stockProductService.findByProduct(dto!);

        return res.status(200).json(result);
    }

    getAll = async (req: Request, res: Response) => {
        const [_, dto] = GetAllStockProductsDTO.create();

        const result = await this.stockProductService.getAll(dto!);

        return res.status(200).json(result);
    }
}