// role-postgres-repository.ts
import { prisma } from "../../../app";
import { RoleEntity } from "../../../common/entity/role";
import { RoleEntityMapper } from "../mapper/role-entity-mapper";

export class RolePostgresRepository {

    async findByName(name: string): Promise<RoleEntity | null> {
        const roleModel = await prisma.role.findUnique({
            where: { name }, 
        });

        return RoleEntityMapper.toDomain(roleModel);
    }

    async findById(id: string): Promise<RoleEntity | null> {
        const roleModel = await prisma.role.findUnique({
            where: { id },
        });

        return RoleEntityMapper.toDomain(roleModel);
    }

    async create(roleEntity: RoleEntity): Promise<RoleEntity | null> {
        const data = RoleEntityMapper.toModel(roleEntity);

        const roleModel = await prisma.role.create({
            data: {
                id: data.id,
                name: data.name,
            },
        });

        return RoleEntityMapper.toDomain(roleModel);
    }

    async findAll(): Promise<RoleEntity[]> {
        const roleModels = await prisma.role.findMany();
        return RoleEntityMapper.toDomainList(roleModels);
    }
}
