import { ErrorHandler } from "../../../common/errors/ErrorHandler";
import { ErrorTypeName } from "../../../common/errors/ErrorType";
import { GenerateUUIDHelper } from "../../../config/adapters/generate-UUID";
import { StockProductRepository } from "../../../data";
import { StockProductEntity } from "../../../common";
import { GetAllStockProductsDTO } from "../../../domain/dto/stock-product/get-all";
import { StockProductRepositoryI } from "../../../domain/repository/stock-product-repository-interface";
import { CreateStockProductDTO } from "../../../domain/dto/stock-product/create";
import { UpdateStockProductDTO } from "../../../domain/dto/stock-product/update";
import { DeleteStockProductDTO } from "../../../domain/dto/stock-product/delete";
import { FindStockProductByProductDTO } from "../../../domain/dto/stock-product/find-by-product";

export class StockProductService {

    constructor(
        private readonly stockProductRepository: StockProductRepositoryI = new StockProductRepository()
    ) {}

    public async create(dto: CreateStockProductDTO) {
        const { currentAmountMl, minimumStockMl, productId } = dto;

        if (currentAmountMl < 0 || minimumStockMl < 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        const existing = await this.stockProductRepository.findByProductId(productId);

        if (!existing) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        const stockId = GenerateUUIDHelper.generate();

        const newStockEntity = StockProductEntity.fromObject({
            id: stockId,
            currentAmountMl,
            minimumStockMl,
            product: { id: productId }
        });

        const savedStock = await this.stockProductRepository.create(newStockEntity);

        return {
            message: "Stock product created successfully",
            stockProduct: {
                id: savedStock.id
            }
        };
    }

    public async update(dto: UpdateStockProductDTO) {
        const { id, currentAmountMl, minimumStockMl } = dto;

        const stock = await this.stockProductRepository.findById(id);

        if (!stock) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        const updatedStock = StockProductEntity.fromObject({
            ...stock,
            currentAmountMl: currentAmountMl ?? stock.currentAmountMl,
            minimumStockMl: minimumStockMl ?? stock.minimumStockMl
        });

        const savedStock = await this.stockProductRepository.update(updatedStock);

        return {
            message: "Stock product updated successfully",
            stockProduct: {
                id: savedStock.id
            }
        };
    }

    public async delete(dto: DeleteStockProductDTO) {
        const { id } = dto;

        const stock = await this.stockProductRepository.findById(id);

        if (!stock) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        await this.stockProductRepository.delete(id);

        return {
            message: "Stock product deleted successfully"
        };
    }

    public async findById(id: string) {
        const stock = await this.stockProductRepository.findById(id);

        if (!stock) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        return {
            stockProduct: stock
        };
    }

    public async findByProduct(dto: FindStockProductByProductDTO) {
        const { productId } = dto;

        const stock = await this.stockProductRepository.findByProductId(productId);

        if (!stock) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        return {
            stockProduct: stock
        };
    }

    public async getAll(dto: GetAllStockProductsDTO) {
        const stocks = await this.stockProductRepository.getAll();

        if (!stocks) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR);
        }

        return {
            stockProducts: stocks
        };
    }
}