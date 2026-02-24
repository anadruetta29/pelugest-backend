import { StockProductEntity } from "../../common";

export interface StockProductRepositoryI {
    
    create(stock: StockProductEntity): Promise<StockProductEntity>;
    
    update(stock: StockProductEntity): Promise<StockProductEntity>;
    
    delete(id: string): Promise<void>;

    findById(id: string): Promise<StockProductEntity | null>;

    findByProductId(productId: string): Promise<StockProductEntity | null>;

    getAll(): Promise<StockProductEntity[] | null>;
}