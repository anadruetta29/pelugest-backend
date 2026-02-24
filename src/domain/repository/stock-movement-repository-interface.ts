import { StockMovementEntity } from "../../common/entity/stock-movement";

export interface StockMovementRepositoryI {

    create(movement: StockMovementEntity): Promise<StockMovementEntity>;

    update(movement: StockMovementEntity): Promise<StockMovementEntity>; 

    delete(id: string): Promise<void>;

    findById(id: string): Promise<StockMovementEntity | null>;

    getAll(): Promise<StockMovementEntity[] | null>;

    getAllByProduct(productId: string): Promise<StockMovementEntity[]>;

    getAllByUser(userId: string): Promise<StockMovementEntity[]>;
}