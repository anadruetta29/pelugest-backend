import { UserEntity } from "../../common/entity/user";

export interface UserRepositoryI {
    
    save(user: UserEntity): Promise<UserEntity>;
    
    update(user: UserEntity): Promise<UserEntity>;
    
    delete(userId: string): Promise<void>;

    findByEmail(email: string): Promise<UserEntity | null>;

    findById(id: string): Promise<UserEntity | null>;

    getAllByStatus(statusId: string): Promise<UserEntity[]>;

    getUsersQuantityByRole(roleId: string): Promise<number>;
}