import { StockMovement } from '@prisma/client';
import { StockMovementEntity } from "../../../common/entity/stock-movement";
import { Prisma } from "@prisma/client";

export type StockMovementModel =
    Prisma.StockMovementGetPayload<{
        include: {
        product: true;
        user: true;
        };
    }>;

export class StockMovementEntityMapper {

    public static toDomain(
        movementModel: StockMovementModel | null
    ): StockMovementEntity | null {

        if (!movementModel) return null;

        return StockMovementEntity.fromObject({
            id: movementModel.id,
            quantityMl: movementModel.quantityMl,
            type: movementModel.type,
            createdAt: movementModel.createdAt,
            product: {
                id: movementModel.product.id,
                name: movementModel.product.name,
            },
            user: {
                id: movementModel.user.id,
                name: movementModel.user.name,
            },
        });
    }

    public static toModel(movement: StockMovementEntity | null): any {
        if (!movement) return null;

        return {
            id: movement.id,
            quantityMl: movement.quantityMl,
            type: movement.type,
            createdAt: movement.createdAt,
            id_product: movement.product.id,
            id_user: movement.user.id,
        };
    }

    public static toDomainList(
        movementModels: StockMovementModel[] | null | undefined
    ): StockMovementEntity[] {
        if (!movementModels) return [];

        return movementModels
            .map(model => this.toDomain(model))
            .filter((movement): movement is StockMovementEntity => movement !== null);
    }
}