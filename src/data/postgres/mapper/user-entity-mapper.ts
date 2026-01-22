import { User as PrismaUser, Role, RecordStatus } from "@prisma/client";
import { UserEntity } from "../../../common/entity/user";
import { RoleEntity } from "../../../common/entity/role";
import { RecordStatusEntity } from "../../../common/entity/record-status";


export type UserModel = PrismaUser & {
    role?: Role | null;
    status?: RecordStatus | null;
};

export class UserEntityMapper {

    public static toDomain(userModel: UserModel | null): UserEntity | null {
        if (!userModel) return null;

        return UserEntity.fromObject({
            id: userModel.id,
            name: userModel.name,
            lastname: userModel.lastname,
            email: userModel.email,
            password: userModel.password,
            role: userModel.role 
                ? RoleEntity.fromObject({
                    id: userModel.role.id,
                    name: userModel.role.name
                })
                : null,
            status: userModel.status
                ? RecordStatusEntity.fromObject({
                    id: userModel.status.id,
                    name: userModel.status.name
                })
                : null
        });
    }

    public static toModel(user: UserEntity | null): any {
        if (!user) return null;

        return {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            id_rol: user.role?.id, 
            id_record_status: user.status?.id,
        };
    }

    public static toDomainList(userModels: UserModel[] | null | undefined): UserEntity[] {
        if (!userModels) return [];

        return userModels
            .map(model => this.toDomain(model)) 
            .filter((user): user is UserEntity => user !== null); 
    }
}