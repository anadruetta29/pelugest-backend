import { RoleEntity } from "../../common/entity/role";

export interface RoleRepositoryI {

    findById(id: string): Promise<RoleEntity | null>;

    findByName(name: string): Promise<RoleEntity | null>;

    getAll(): Promise<RoleEntity[]>;

}
