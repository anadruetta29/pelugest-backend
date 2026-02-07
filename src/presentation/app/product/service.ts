import { Service } from '@prisma/client';
import { ErrorHandler } from "../../../common/errors/ErrorHandler";
import { ErrorTypeName } from "../../../common/errors/ErrorType";
import { GenerateUUIDHelper } from "../../../config/adapters/generate-UUID";
import { ProductRepositoryI } from '../../../domain/repository/product-repository-interface';
import { ProductRepository } from '../../../data/repository/product-repository';
import { RecordStatusRepositoryI, RegexValidator } from '../../../domain';
import { RecordStatusRepository } from '../../../data';
import { CreateProductDTO } from '../../../domain/dto/product/create';
import { ProductEntity } from '../../../common';
import { UpdateProductDTO } from '../../../domain/dto/product/update';
import { DeleteProductDTO } from '../../../domain/dto/product/delete';
import { FindProductByIdDTO } from '../../../domain/dto/product/find-by-id';
import { GetAllProductsDTO } from '../../../domain/dto/product/get-all';
import { GetAllProductsByStatusDTO } from '../../../domain/dto/product/get-all-by-status';
import { DeactivateProductDTO } from '../../../domain/dto/product/deactivate';


export class ProductService {

    constructor(
        private readonly productRepository: ProductRepositoryI = new ProductRepository(),
        private readonly recordStatusRepository: RecordStatusRepositoryI = new RecordStatusRepository()
    ) {}

    public async create(dto: CreateProductDTO) {
        const { name, price } = dto;

        if (!RegexValidator.validate(name, RegexValidator.NAME)) {
            throw new ErrorHandler(ErrorTypeName.INVALID_NAME);
        }

        const [recordStatus] = await Promise.all([
            this.recordStatusRepository.findByName('ACTIVE')
        ]);

        if (!recordStatus) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR);
        }

        if (price < 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD)
        }
        
        const productId = GenerateUUIDHelper.generate();      

        const newProductEntity = ProductEntity.fromObject({
            id: productId,
            name,
            price,
            status: { id: recordStatus.id } 
        });

        const savedProduct = await this.productRepository.save(newProductEntity);

        return {
            message: "Product created successfully",
            product: {
                id: savedProduct.id
            }
        };
    }

    public async update(dto: UpdateProductDTO) {
        const { id, name, price, status } = dto;


        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        if (!RegexValidator.validate(name, RegexValidator.NAME)) {
            throw new ErrorHandler(ErrorTypeName.INVALID_NAME);
        }

        if (product.price < 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD)
        }

        const updatedProduct = ProductEntity.fromObject({
            ...product,
            name,
            price,
            status
        });

        const savedProduct = await this.productRepository.update(updatedProduct);

        return {
            message: "Product updated successfully",
            product: {
                id: savedProduct.id
            }
        };
    }

    public async delete(dto: DeleteProductDTO) {
        const { id } = dto;

        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        const recordStatus = await this.recordStatusRepository.findByName('DELETED');

        if (!recordStatus) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR);
        }

        const deletedProduct = ProductEntity.fromObject({
            ...product,
            status: { id: recordStatus.id }
        });

        await this.productRepository.update(deletedProduct);

        return {
            message: "Product deleted successfully"
        };
    }

    public async findById(dto: FindProductByIdDTO) {
        const { id } = dto;

        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        return {
            product
        };
    }

    public async getAll(dto: GetAllProductsDTO) {
        const products = await this.productRepository.getAll();

        if (!products) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR)
        }

        return {
            products
        };
 
    }

    public async getAllByStatus(dto: GetAllProductsByStatusDTO) {
        const { statusId } = dto;

        const products = await this.productRepository.getAllByStatus(statusId);

        if (!products) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR)
        }

        return {
            products
        };
    }

    public async deactivate(dto: DeactivateProductDTO) {
        const { id } = dto; 

        const deactivatedProduct = await this.productRepository.deactivate(id);

        if (!deactivatedProduct) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR)
        }

        return {
            message: "Product deactivated successfully",
            product: {
                id: deactivatedProduct.id
            }
        }
    }
}