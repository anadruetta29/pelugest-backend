import { UserEntity } from "../../../common/entity/user";
import { ErrorHandler } from "../../../common/errors/ErrorHandler";
import { ErrorTypeName } from "../../../common/errors/ErrorType";
import { GenerateUUIDHelper } from "../../../config/adapters/generate-UUID";
import { AuthHelper } from "../../../config/helpers/AuthHelper";
import { UserRepository } from "../../../data/repository/user-repository";
import { LoginUserDTO } from "../../../domain/dto/auth/login";
import { RegisterUserDTO } from "../../../domain/dto/auth/register";
import { UserRepositoryI } from "../../../domain/repository/user-repository-interface";

export class AuthService {


    constructor(
        private readonly authHelper = new AuthHelper(),
        private readonly userRepository: UserRepositoryI = new UserRepository()    
    ) {}

    public async register(dto: RegisterUserDTO) {

        const { name, lastname, email, password } = dto;
        
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new ErrorHandler(ErrorTypeName.EMAIL_ALREADY_EXISTS);
        }

        const userId = GenerateUUIDHelper.generate();      

        const hashedPassword = await this.authHelper.hashPassword(password);
        
        const newUserEntity = UserEntity.fromObject({
            id: userId,
            name,
            lastname,
            email,
            password: hashedPassword,
            role: { id: 'HAIRDRESSER_ID_AQUI' }, 
            status: { id: '1' } 
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

        const isPasswordCorrect = await this.authHelper.validatePassword(user.password, password);
        
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
}