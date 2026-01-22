export class UserEntityMapper {

    public static toDomain(userModel: UserModel | null): User | null {
        if (!userModel) return null;

        return new User(
            userModel.id,
            userModel.email,
            userModel.password || '',
            userModel.status,
            userModel.role,
        );
    }

    public static toModel(user: User | null): UserModel | null {
        if (!user) return null;

        return {
            id: user.id,
            email: user.email,
            password: user.password,
            role: user.role,
            status: user.status,
        };
    }

    public static toDomainList(userModels: UserModel[] | null): User[] {
        if (!userModels) return [];

        return userModels.map(model => this.toDomain(model)).filter(u => u !== null) as User[];
    }

    public static toModelList(users: User[] | null): UserModel[] {
        if (!users) return [];

        return users.map(user => this.toModel(user)).filter(m => m !== null) as UserModel[];
    }
}