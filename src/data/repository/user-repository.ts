import { prisma } from "../../app";
import { UserEntity } from "../../common/entity/user";
import { UserEntityMapper, UserModel } from "../postgres/mapper/user-entity-mapper";


export class UserRepository implements UserRepositoryI {
    
    private normalizePage(page: number | null | undefined): number {
        return (page !== undefined && page !== null && page > 0) ? page - 1 : 0;
    }

    async save(user: UserEntity): Promise<UserEntity> {
        const model = UserEntityMapper.toModel(user);
        
        const saved = await prisma.user.create({
            data: {
                id: model.id,
                name: model.name,
                lastname: model.lastname,
                email: model.email,
                password: model.password,
                role: { connect: { id: model.id_rol } },
                status: { connect: { id: model.id_record_status } }
            },
            include: { role: true, status: true }
        });

        return UserEntityMapper.toDomain(saved as UserModel)!;
    }

    async update(user: UserEntity): Promise<UserEntity> {
        const model = UserEntityMapper.toModel(user);
        
        const updated = await prisma.user.update({
            where: { id: model.id },
            data: {
                name: model.name,
                lastname: model.lastname,
                email: model.email,
                id_rol: model.id_rol,
                id_record_status: model.id_record_status
            },
            include: { role: true, status: true }
        });

        return UserEntityMapper.toDomain(updated as UserModel)!;
    }

    async delete(userId: string): Promise<void> {
        await prisma.user.delete({
            where: { id: userId }
        });
    }


    async getAllByStatus(statusId: string): Promise<UserEntity[]> {
        const models = await prisma.user.findMany({
            where: { id_record_status: statusId },
            include: { role: true, status: true }
        });
        
        return UserEntityMapper.toDomainList(models as UserModel[]);
    }

    async getUsersQuantityByRole(roleId: string): Promise<number> {
        return await prisma.user.count({
            where: { id_rol: roleId }
        });
    }
}