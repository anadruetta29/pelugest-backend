import { Product } from "@prisma/client";

export class StockProductEntity {
    private constructor(
        public id: string,
        public currentAmountMl: number,
        public minimumStockMl: number,
        public product: Product
    ) {}

    static fromObject(object: { [key: string]: any }): StockProductEntity {
        return new StockProductEntity(
            object.id, 
            object.currentAmountMl,
            object.minimumStockMl,
            object.product
        );
    }
}
