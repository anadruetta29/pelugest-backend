import { ClientEntity } from "../../common";

export interface ClientRepositoryI {
    
    save(client: ClientEntity): Promise<ClientEntity>;
    
    update(client: ClientEntity): Promise<ClientEntity>;
    
    delete(clientId: string): Promise<void>;

    findById(id: string): Promise<ClientEntity | null>;

    getAllByStatus(statusId: string): Promise<ClientEntity[]>;

}