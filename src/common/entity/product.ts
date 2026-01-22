import { RecordStatusEntity } from "./record-status";
import { ServiceProductRequirementEntity } from "./service-product-requirement";
import { StockProductEntity } from "./stock-product";

export class ProductEntity {
    private constructor(
        public id: string,
        public name: string,
        public price: number,
        public serviceProductRequirementEntity: ServiceProductRequirementEntity,
        public stock: StockProductEntity,
        public status: RecordStatusEntity
    ) {}

    static fromObject(object: { [key: string]: any }): ProductEntity {
        return new ProductEntity(
            object.id,
            object.name,
            object.price,
            object.serviceProductRequirementEntity,
            object.stock,
            object.status
        );
    }
}
