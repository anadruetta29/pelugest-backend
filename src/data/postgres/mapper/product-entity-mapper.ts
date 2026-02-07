import { RecordStatusEntity } from "../../../common/entity/record-status";
import { ClientEntity, ProductEntity } from "../../../common";
import { Product, RecordStatus } from "@prisma/client";

export type ProductModel = Product & {
    status?: RecordStatus | null;
};

export class ProductEntityMapper {

    public static toDomain(productModel: ProductModel | null): ProductEntity | null {
        if (!productModel) return null;

        return ProductEntity.fromObject({
            id: productModel.id,
            name: productModel.name,
            price: productModel.price,
            status: productModel.status
                ? RecordStatusEntity.fromObject({
                    id: productModel.status.id,
                    name: productModel.status.name
                })
                : null
        });
    }

    public static toModel(product: ProductEntity | null): any {
        if (!product) return null;

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            id_record_status: product.status?.id,
        };
    }

    public static toDomainList(productModels: ProductModel[] | null | undefined): ProductEntity[] {
        if (!productModels) return [];

        return productModels
            .map(model => this.toDomain(model)) 
            .filter((product): product is ProductEntity => product !== null); 
    }
}