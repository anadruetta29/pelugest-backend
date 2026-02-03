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

export class AuthService {


    constructor(
        private readonly authHelper = new AuthHelper(),
        private readonly userRepository: UserRepositoryI = new UserRepository(),    
        private readonly roleRepository: RoleRepositoryI = new RoleRepository(),
        private readonly recordStatusRepository: RecordStatusRepositoryI = new RecordStatusRepository()
    ) {}

    public async register(dto: RegisterUserDTO) {

        const { name, surname, email, password } = dto;

        if (!RegexValidator.validate(name, RegexValidator.NAME)) {
            throw new ErrorHandler(ErrorTypeName.INVALID_NAME);
        }
        if (!RegexValidator.validate(surname, RegexValidator.SURNAME)) {
            throw new ErrorHandler(ErrorTypeName.INVALID_SURNAME);
        }
        if (!RegexValidator.validate(email, RegexValidator.EMAIL)) {
            throw new ErrorHandler(ErrorTypeName.INVALID_EMAIL);
        }
        
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new ErrorHandler(ErrorTypeName.EMAIL_ALREADY_EXISTS);
        }

        const [role, recordStatus] = await Promise.all([
            this.roleRepository.findByName('HAIRDRESSER'),
            this.recordStatusRepository.findByName('ACTIVE')
        ]);

        if (!role || !recordStatus) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR);
        }
        
        const userId = GenerateUUIDHelper.generate();      

        const hashedPassword = await this.authHelper.hashPassword(password);
        
        const newUserEntity = UserEntity.fromObject({
            id: userId,
            name,
            surname,
            email,
            password: hashedPassword,
            role: { id: role.id }, 
            status: { id: recordStatus.id } 
        });

        const savedUser = await this.userRepository.save(newUserEntity);

        return {
            message: "User created successfully",
            user: {
                id: savedUser.id,
                email: savedUser.email
            }
        };
        
    }

    public async login(dto: LoginUserDTO) {
        const { email, password } = dto;

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new ErrorHandler(ErrorTypeName.USER_NOT_FOUND);
        }

        const isPasswordCorrect = await this.authHelper.validatePassword(user, password);
        
        if (!isPasswordCorrect) {
            throw new ErrorHandler(ErrorTypeName.INVALID_PASSWORD);
        }

        const token = await this.authHelper.createToken({
            id: user.id,
            email: user.email,
            role: user.role?.name
        });

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role?.name
            },
            token: token
        };
    }

    public async auth(authorizationHeader?: string) {
        if (!authorizationHeader) {
            throw new ErrorHandler(ErrorTypeName.INVALID_TOKEN);
        }

        const validatedToken = this.authHelper.validateToken(authorizationHeader);

        if (!validatedToken) {
            throw new ErrorHandler(ErrorTypeName.INVALID_TOKEN);
        }

        const userId = this.authHelper.getSubject(validatedToken);

        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new ErrorHandler(ErrorTypeName.USER_NOT_FOUND);
        }

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role?.name,
                status: user.status?.name
            }
        };
    }

}