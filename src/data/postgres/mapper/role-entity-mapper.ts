import { Role as PrismaRole } from "@prisma/client";
import { RoleEntity } from "../../../common/entity/role";

export type RoleModel = PrismaRole;

export class RoleEntityMapper {

    public static toDomain(roleModel: RoleModel | null): RoleEntity | null {
        if (!roleModel) return null;

        return RoleEntity.fromObject({
            id: roleModel.id,
            name: roleModel.name,
        });
    }

    public static toModel(role: RoleEntity | null): any {
        if (!role) return null;

        return {
            id: role.id,
            name: role.name,
        };
    }

    public static toDomainList(roleModels: RoleModel[] | null | undefined): RoleEntity[] {
        if (!roleModels) return [];

        return roleModels
            .map(model => this.toDomain(model))
            .filter((role): role is RoleEntity => role !== null);
    }
    
}
