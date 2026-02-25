import { prisma } from "../../app";
import { StockProductEntity } from "../../common";
import { StockProductRepositoryI } from "../../domain/repository/stock-product-repository-interface";
import { StockProductEntityMapper, StockProductModel } from "../mapper/stock-product-entity-mapper";

export class StockProductRepository implements StockProductRepositoryI {

    async findById(id: string): Promise<StockProductEntity | null> {
        const model = await prisma.stockProduct.findUnique({
            where: { id },
            include: { product: true }
        });

        return StockProductEntityMapper.toDomain(model as StockProductModel);
    }

    async findByProductId(productId: string): Promise<StockProductEntity | null> {
        const model = await prisma.stockProduct.findUnique({
            where: { id_product: productId },
            include: { product: true }
        });

        return StockProductEntityMapper.toDomain(model as StockProductModel);
    }

    async create(stock: StockProductEntity): Promise<StockProductEntity> {
        const model = StockProductEntityMapper.toModel(stock);

        const saved = await prisma.stockProduct.create({
            data: {
                id: model.id,
                currentAmountMl: model.currentAmountMl,
                minimumStockMl: model.minimumStockMl,
                product: {
                    connect: { id: model.id_product }
                }
            },
            include: { product: true }
        });

        return StockProductEntityMapper.toDomain(saved as StockProductModel)!;
    }

    async update(stock: StockProductEntity): Promise<StockProductEntity> {
        const model = StockProductEntityMapper.toModel(stock);

        const updated = await prisma.stockProduct.update({
            where: { id: model.id },
            data: {
                currentAmountMl: model.currentAmountMl,
                minimumStockMl: model.minimumStockMl
            },
            include: { product: true }
        });

        return StockProductEntityMapper.toDomain(updated as StockProductModel)!;
    }

    async delete(id: string): Promise<void> {
        await prisma.stockProduct.delete({
            where: { id }
        });
    }

    async getAll(): Promise<StockProductEntity[]> {
        const models = await prisma.stockProduct.findMany({
            include: { product: true }
        });

        return StockProductEntityMapper.toDomainList(models as StockProductModel[]);
    }
}