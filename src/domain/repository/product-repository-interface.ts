import { ProductEntity } from "../../common";

export interface ProductRepositoryI {
    
    save(product: ProductEntity): Promise<ProductEntity>;
    
    update(product: ProductEntity): Promise<ProductEntity>;
    
    delete(productId: string): Promise<void>;

    findById(id: string): Promise<ProductEntity | null>;

    getAll(): Promise<ProductEntity[] | null> 

    getAllByStatus(statusId: string): Promise<ProductEntity[]>;

    deactivate(id: string): Promise<ProductEntity>;

}