import { Request, Response } from 'express';
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

    create = async (req: Request, res: Response) => {
        const [_, dto] = CreateProductDTO.create(req.body);

        const result = await this.productService.create(dto!);

        return res.status(201).json(result);
    }

    update = async (req: Request, res: Response) => {
        const [_, dto] = UpdateProductDTO.create({
            id: req.params.id,
            ...req.body  
        });

        const result = await this.productService.update(dto!);

        return res.status(200).json(result);
    }

    delete = async (req: Request, res: Response) => {
        const [_, dto] = DeleteProductDTO.create(req.body);

        const result = await this.productService.delete(dto!);

        return res.status(200).json(result);
    }

    findById = async (req: Request, res: Response) => {
        const [_, dto] = FindProductByIdDTO.create({ id: req.params.id });

        const result = await this.productService.findById(dto!);

        return res.status(200).json(result);
    }

    getAll = async(req: Request, res: Response) => {
        const [_, dto] = GetAllProductsDTO.create();

        const result = await this.productService.getAll(dto!);

        return res.status(200).json(result);
    }

    getAllByStatus = async(req: Request, res: Response) => {
        const { statusId } = req.params;

        const [_, dto] = GetAllProductsByStatusDTO.create({ statusId });

        const result = await this.productService.getAllByStatus(dto!);

        return res.status(200).json(result);

    }

     deactivate = async(req: Request, res: Response) => {
        const { id } = req.params;

        const [_, dto] = DeactivateProductDTO.create({ id });

        const result = await this.productService.deactivate(dto!);

        return res.status(200).json(result);
    }
}
