import { prisma } from "../../app";
import { RoleEntity } from "../../common/entity/role";
import { RoleEntityMapper, RoleModel } from "../postgres/mapper/role-entity-mapper";

export class RoleRepository {

    async findById(id: string): Promise<RoleEntity | null> {
        const model = await prisma.role.findUnique({
            where: { id },
        });

        return RoleEntityMapper.toDomain(model as RoleModel);
    }

    async findByName(name: string): Promise<RoleEntity | null> {
        const model = await prisma.role.findUnique({
            where: { name },
        });

        return RoleEntityMapper.toDomain(model as RoleModel);
    }

    async getAll(): Promise<RoleEntity[]> {
        const models = await prisma.role.findMany();
        return RoleEntityMapper.toDomainList(models as RoleModel[]);
    }
}
