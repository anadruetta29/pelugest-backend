import { ErrorHandler } from "../../../common/errors/ErrorHandler";
import { ErrorTypeName } from "../../../common/errors/ErrorType";
import { GenerateUUIDHelper } from "../../../config/adapters/generate-UUID";
import { StockMovementRepository } from "../../../data";
import { StockProductRepository } from "../../../data";
import { StockMovementRepositoryI } from "../../../domain/repository/stock-movement-repository-interface";
import { StockProductRepositoryI } from "../../../domain/repository/stock-product-repository-interface";
import { CreateStockMovementDTO } from "../../../domain/dto/stock-movement/create";
import { GetAllStockMovementsByProductDTO } from "../../../domain/dto/stock-movement/get-all-by-product";
import { GetAllStockMovementsByUserDTO } from "../../../domain/dto/stock-movement/get-all-by-user";
import { StockMovementEntity } from "../../../common/entity/stock-movement";
import { DeleteStockMovementDTO } from "../../../domain/dto/stock-movement/delete";
import { GetAllStockMovementsDTO } from "../../../domain/dto/stock-movement/get-all";

export class StockMovementService {

    constructor(
        private readonly stockMovementRepository: StockMovementRepositoryI = new StockMovementRepository(),
        private readonly stockProductRepository: StockProductRepositoryI = new StockProductRepository()
    ) {}

    public async create(dto: CreateStockMovementDTO) {
        const { quantityMl, type, productId, userId } = dto;

        if (quantityMl <= 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        const stock = await this.stockProductRepository.findByProductId(productId);

        if (!stock) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        let updatedAmount = stock.currentAmountMl;

        if (type === "IN") {
            updatedAmount += quantityMl;
        } 
        else if (type === "OUT") {

            if (stock.currentAmountMl < quantityMl) {
                throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
            }

            updatedAmount -= quantityMl;
        } 
        else {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        const movementId = GenerateUUIDHelper.generate();

        const movementEntity = StockMovementEntity.fromObject({
            id: movementId,
            quantityMl,
            type,
            product: { id: productId },
            user: { id: userId }
        });

        const savedMovement = await this.stockMovementRepository.create(movementEntity);

        await this.stockProductRepository.update({
            ...stock,
            currentAmountMl: updatedAmount
        });

        return {
            message: "Stock movement created successfully",
            stockMovement: {
                id: savedMovement.id
            }
        };
    }

    public async delete(dto: DeleteStockMovementDTO) {
        const { id } = dto;

        const stock = await this.stockMovementRepository.findById(id);

        if (!stock) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        await this.stockMovementRepository.delete(id);

        return {
            message: "Stock movement deleted successfully"
        };
    }

    public async getAllByProduct(dto: GetAllStockMovementsByProductDTO) {
        const { productId } = dto;

        const movements = await this.stockMovementRepository.getAllByProduct(productId);

        if (!movements) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR);
        }

        return {
            stockMovements: movements
        };
    }

    public async getAllByUser(dto: GetAllStockMovementsByUserDTO) {
        const { userId } = dto;

        const movements = await this.stockMovementRepository.getAllByUser(userId);

        if (!movements) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR);
        }

        return {
            stockMovements: movements
        };
    }

    public async findById(id: string) {
        const movement = await this.stockMovementRepository.findById(id);

        if (!movement) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        return {
            stockMovement: movement
        };
    }

    public async getAll(dto: GetAllStockMovementsDTO) {
        const stocks = await this.stockMovementRepository.getAll();

        if (!stocks) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR);
        }

        return {
            stockProducts: stocks
        };
    }
}