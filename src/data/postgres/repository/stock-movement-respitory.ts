import { prisma } from "../../../app";
import { StockMovementEntity } from "../../../common/entity/stock-movement";
import { StockMovementEntityMapper } from "../mapper/stock-movement-entity-mapper";

export class StockMovementPostgresRepository {

    async create(movementEntity: StockMovementEntity): Promise<StockMovementEntity | null> {

        const data = StockMovementEntityMapper.toModel(movementEntity);

        const movementModel = await prisma.stockMovement.create({
            data: {
                id: data.id,
                quantityMl: data.quantityMl,
                type: data.type,
                createdAt: data.createdAt,
                product: {
                    connect: { id: data.id_product }
                },
                user: {
                    connect: { id: data.id_user }
                }
            },
            include: {
                product: true,
                user: true
            }
        });

        return StockMovementEntityMapper.toDomain(movementModel);
    }

    async findById(id: string): Promise<StockMovementEntity | null> {

        const movementModel = await prisma.stockMovement.findUnique({
            where: { id },
            include: {
                product: true,
                user: true
            }
        });

        return StockMovementEntityMapper.toDomain(movementModel);
    }

    async findByProductId(productId: string): Promise<StockMovementEntity[]> {

        const movementModels = await prisma.stockMovement.findMany({
            where: { id_product: productId },
            orderBy: { createdAt: "desc" },
            include: {
                product: true,
                user: true
            }
        });

        return StockMovementEntityMapper.toDomainList(movementModels);
    }

    async findAll(): Promise<StockMovementEntity[]> {

        const movementModels = await prisma.stockMovement.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                product: true,
                user: true
            }
        });

        return StockMovementEntityMapper.toDomainList(movementModels);
    }

    async delete(id: string): Promise<void> {
        await prisma.stockMovement.delete({
            where: { id }
        });
    }
}