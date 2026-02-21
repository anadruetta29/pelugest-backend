import { Request, Response, NextFunction } from 'express';
import { CreateProductDTO } from '../../../domain/dto/product/create';
import { UpdateProductDTO } from '../../../domain/dto/product/update';
import { DeleteProductDTO } from '../../../domain/dto/product/delete';
import { FindProductByIdDTO } from '../../../domain/dto/product/find-by-id';
import { GetAllProductsDTO } from '../../../domain/dto/product/get-all';
import { GetAllProductsByStatusDTO } from '../../../domain/dto/product/get-all-by-status';
import { DeactivateProductDTO } from '../../../domain/dto/product/deactivate';
import { ProductService } from './service';

export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {}

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, dto] = CreateProductDTO.create(req.body);

            if (error) return res.status(400).json({ error });

            const result = await this.productService.create(dto!);

            return res.status(201).json(result);
        } 
        catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, dto] = UpdateProductDTO.create({
                id: req.params.id,
                ...req.body
            });

            if (error) return res.status(400).json({ error });

            const result = await this.productService.update(dto!);

            return res.status(200).json(result);
        } 
        catch (error) {
            next(error);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, dto] = DeleteProductDTO.create(req.body);

            if (error) return res.status(400).json({ error });

            const result = await this.productService.delete(dto!);

            return res.status(200).json(result);
        } 
        catch (error) {
            next(error);
        }
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, dto] = FindProductByIdDTO.create({ id: req.params.id });

            if (error) return res.status(400).json({ error });

            const result = await this.productService.findById(dto!);

            return res.status(200).json(result);
        } 
        catch (error) {
            next(error);
        }
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, dto] = GetAllProductsDTO.create();

            if (error) return res.status(400).json({ error });

            const result = await this.productService.getAll(dto!);

            return res.status(200).json(result);
        } 
        catch (error) {
            next(error);
        }
    }

    getAllByStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { statusId } = req.params;

            const [error, dto] = GetAllProductsByStatusDTO.create({ statusId });

            if (error) return res.status(400).json({ error });

            const result = await this.productService.getAllByStatus(dto!);

            return res.status(200).json(result);
        } 
        catch (error) {
            next(error);
        }
    }

    deactivate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            const [error, dto] = DeactivateProductDTO.create({ id });

            if (error) return res.status(400).json({ error });

            const result = await this.productService.deactivate(dto!);

            return res.status(200).json(result);
        } 
        catch (error) {
            next(error);
        }
    }
}