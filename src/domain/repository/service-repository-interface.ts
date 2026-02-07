import { ServiceEntity } from "../../common";

export interface ServiceRepositoryI {
    
    save(client: ServiceEntity): Promise<ServiceEntity>;
    
    update(client: ServiceEntity): Promise<ServiceEntity>;
    
    delete(serviceId: string): Promise<void>;

    findById(id: string): Promise<ServiceEntity | null>;

    getAll(): Promise<ServiceEntity[] | null> 

    getAllByStatus(statusId: string): Promise<ServiceEntity[]>;

    deactivate(id: string): Promise<ServiceEntity>;

}