export class StockProductEntity {
    private constructor(
        public currentAmountMl: number,
        public minimumStockMl: number
    ) {}

    static fromObject(object: { [key: string]: any }): StockProductEntity {
        return new StockProductEntity(
            object.currentAmountMl,
            object.minimumStockMl
        );
    }
}
