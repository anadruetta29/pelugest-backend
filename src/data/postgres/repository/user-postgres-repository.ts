import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

export class UserPostgresRepository {
    
    async create(userData: any) {
        return await prisma.user.create({
            data: {
                id: userData.id,
                name: userData.name,
                lastname: userData.lastname,
                email: userData.email,
                password: userData.password,
                role: {
                    connect: { name: 'HAIRDRESSER' }
                },
            },
            include: {
                role: true,
                status: true
            }
        });
    }
}