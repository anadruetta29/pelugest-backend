import { prisma } from "../../app";
import { StockMovementEntity } from "../../common/entity/stock-movement";
import { StockMovementRepositoryI } from "../../domain/repository/stock-movement-repository-interface";
import { StockMovementEntityMapper, StockMovementModel } from "../postgres/mapper/stock-movement-entity-mapper";

export class StockMovementRepository implements StockMovementRepositoryI {

    async findById(id: string): Promise<StockMovementEntity | null> {
        const model = await prisma.stockMovement.findUnique({
            where: { id },
            include: {
                product: true,
                user: true
            }
        });

        return StockMovementEntityMapper.toDomain(model as StockMovementModel);
    }

    async create(movement: StockMovementEntity): Promise<StockMovementEntity> {
        const model = StockMovementEntityMapper.toModel(movement);

        const saved = await prisma.stockMovement.create({
            data: {
                id: model.id,
                quantityMl: model.quantityMl,
                type: model.type,
                reason: model.reason,
                createdAt: model.createdAt,
                product: {
                    connect: { id: model.id_product }
                },
                user: {
                    connect: { id: model.id_user }
                }
            },
            include: {
                product: true,
                user: true
            }
        });

        return StockMovementEntityMapper.toDomain(saved as StockMovementModel)!;
    }

    async delete(id: string): Promise<void> {
        await prisma.stockMovement.delete({
            where: { id }
        });
    }

    async getAll(): Promise<StockMovementEntity[]> {
        const models = await prisma.stockMovement.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                product: true,
                user: true
            }
        });

        return StockMovementEntityMapper.toDomainList(models as StockMovementModel[]);
    }

    async getAllByProduct(productId: string): Promise<StockMovementEntity[]> {
        const models = await prisma.stockMovement.findMany({
            where: { id_product: productId },
            orderBy: { createdAt: "desc" },
            include: {
                product: true,
                user: true
            }
        });

        return StockMovementEntityMapper.toDomainList(models as StockMovementModel[]);
    }

    async getAllByUser(userId: string): Promise<StockMovementEntity[]> {
        const models = await prisma.stockMovement.findMany({
            where: { id_user: userId },
            orderBy: { createdAt: "desc" },
            include: {
                product: true,
                user: true
            }
        });

        return StockMovementEntityMapper.toDomainList(models as StockMovementModel[]);
    }
}