import { UserRepository } from "../../../data";
import { UserRepositoryI } from "../../../domain";
import { GetAllUsersByRoleNameDTO } from "../../../domain/dto/user/get-all-by-role-name";

export class UserService {

    constructor(
        private readonly userRepository: UserRepositoryI = new UserRepository(),
    ) {}

    public async getAllByRoleName(dto: GetAllUsersByRoleNameDTO) {

        const users = await this.userRepository.getAllByRoleName(dto.roleName);

        return { users } ;
    }
}