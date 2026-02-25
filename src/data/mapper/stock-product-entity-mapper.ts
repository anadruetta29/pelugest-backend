import { StockProduct } from "@prisma/client";
import { StockProductEntity } from "../../common";

export type StockProductModel = StockProduct;

export class StockProductEntityMapper {

    public static toDomain(stockModel: StockProductModel | null): StockProductEntity | null {
        if (!stockModel) return null;

        return StockProductEntity.fromObject({
            id: stockModel.id,
            product: stockModel.id_product,
            currentAmountMl: stockModel.currentAmountMl,
            minimumStockMl: stockModel.minimumStockMl,
        });
    }

    public static toModel(stock: StockProductEntity | null): any {
        if (!stock) return null;

        return {
            id: stock.id,
            id_product: stock.product.id,
            currentAmountMl: stock.currentAmountMl,
            minimumStockMl: stock.minimumStockMl,
        };
    }

    public static toDomainList(
        stockModels: StockProductModel[] | null | undefined
    ): StockProductEntity[] {
        if (!stockModels) return [];

        return stockModels
            .map(model => this.toDomain(model))
            .filter((stock): stock is StockProductEntity => stock !== null);
    }
}