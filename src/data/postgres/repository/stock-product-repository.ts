import { prisma } from "../../../app";
import { StockProductEntity } from "../../../common";
import { StockProductEntityMapper } from "../mapper/stock-product-entity-mapper";

export class StockProductPostgresRepository {

    async create(stockEntity: StockProductEntity): Promise<StockProductEntity | null> {

        const data = StockProductEntityMapper.toModel(stockEntity);

        const stockModel = await prisma.stockProduct.create({
            data: {
                id: data.id,
                currentAmountMl: data.currentAmountMl,
                minimumStockMl: data.minimumStockMl,
                product: {
                    connect: { id: data.id_product }
                }
            },
            include: {
                product: true
            }
        });

        return StockProductEntityMapper.toDomain(stockModel);
    }

    async update(stockEntity: StockProductEntity): Promise<StockProductEntity | null> {

        const data = StockProductEntityMapper.toModel(stockEntity);

        const stockModel = await prisma.stockProduct.update({
            where: {
                id: data.id
            },
            data: {
                currentAmountMl: data.currentAmountMl,
                minimumStockMl: data.minimumStockMl
            },
            include: {
                product: true
            }
        });

        return StockProductEntityMapper.toDomain(stockModel);
    }

    async findByProductId(productId: string): Promise<StockProductEntity | null> {

        const stockModel = await prisma.stockProduct.findUnique({
            where: {
                id_product: productId
            },
            include: {
                product: true
            }
        });

        return StockProductEntityMapper.toDomain(stockModel);
    }

    async findAll(): Promise<StockProductEntity[]> {

        const stockModels = await prisma.stockProduct.findMany({
            include: {
                product: true
            }
        });

        return StockProductEntityMapper.toDomainList(stockModels);
    }

    async updateStockAmount(productId: string, amount: number): Promise<void> {
        await prisma.stockProduct.update({
            where: { id_product: productId },
            data: {
                currentAmountMl: amount
            }
        });
    }

    async incrementStock(productId: string, amount: number): Promise<void> {
        await prisma.stockProduct.update({
            where: { id_product: productId },
            data: {
                currentAmountMl: {
                    increment: amount
                }
            }
        });
    }

    async decrementStock(productId: string, amount: number): Promise<void> {
        await prisma.stockProduct.update({
            where: { id_product: productId },
            data: {
                currentAmountMl: {
                    decrement: amount
                }
            }
        });
    }
}