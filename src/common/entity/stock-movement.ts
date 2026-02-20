import { Product, User } from "@prisma/client";
import { StockMovementTypeEntity } from "./stock-movement-type";

export class StockMovementEntity {
    private constructor(
        public id: string,
        public quantityMl: number,
        public type: StockMovementTypeEntity,
        public createdAt: Date,
        public product: Product,
        public user: User
    ) {}

    static fromObject(object: { [key: string]: any }): StockMovementEntity {
        return new StockMovementEntity(
            object.id,
            object.quantityMl,
            object.type,
            object.createdAt,
            object.product,
            object.user
        )
    }
}