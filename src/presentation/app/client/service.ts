import { RoleRepository } from './../../../data/repository/role-repository';
import { UserEntity } from "../../../common/entity/user";
import { ErrorHandler } from "../../../common/errors/ErrorHandler";
import { ErrorTypeName } from "../../../common/errors/ErrorType";
import { GenerateUUIDHelper } from "../../../config/adapters/generate-UUID";
import { AuthHelper } from "../../../config/helpers/AuthHelper";
import { UserRepository } from "../../../data/repository/user-repository";
import { RecordStatusRepositoryI, RegexValidator, RoleRepositoryI } from "../../../domain";
import { LoginUserDTO } from "../../../domain/dto/auth/login";
import { RegisterUserDTO } from "../../../domain/dto/auth/register";
import { UserRepositoryI } from "../../../domain/repository/user-repository-interface";
import { RecordStatusRepository } from '../../../data';
import { AuthUserDTO } from '../../../domain/dto/auth/auth';

export class ClientService {

    constructor(
        private readonly authHelper = new AuthHelper(),
        private readonly userRepository: UserRepositoryI = new UserRepository(),    
        private readonly roleRepository: RoleRepositoryI = new RoleRepository(),
        private readonly recordStatusRepository: RecordStatusRepositoryI = new RecordStatusRepository()
    ) {}

    public async create() {}
    public async update() {}
    public async delete() {}
    public async findById() {}
}