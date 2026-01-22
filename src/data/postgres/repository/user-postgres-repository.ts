import { prisma } from "../../../app"; 
import { UserEntity } from "../../../common/entity/user";
import { UserEntityMapper } from "../mapper/user-entity-mapper";

export class UserPostgresRepository {
    
    async create(userEntity: UserEntity): Promise<UserEntity | null> {

        const data = UserEntityMapper.toModel(userEntity);

        const userModel = await prisma.user.create({
            data: {
                id: data.id,
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                password: data.password,
                role: {
                    connect: { id: data.id_rol }
                },
                status: {
                    connect: { id: data.id_record_status }
                }
            },
            include: {
                role: true,
                status: true
            }
        });

        return UserEntityMapper.toDomain(userModel);
    }

    async findById(id: string): Promise<UserEntity | null> {
        const userModel = await prisma.user.findUnique({
            where: { id },
            include: { 
                role: true, 
                status: true 
            }
        });
    
        return UserEntityMapper.toDomain(userModel);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const userModel = await prisma.user.findUnique({
            where: { email },
            include: {
                role: true,
                status: true
            }
        });

        return UserEntityMapper.toDomain(userModel);
    }
}