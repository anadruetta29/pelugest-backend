import { ErrorHandler } from "../../../common/errors/ErrorHandler";
import { ErrorTypeName } from "../../../common/errors/ErrorType";
import { GenerateUUIDHelper } from "../../../config/adapters/generate-UUID";
import { AuthHelper } from "../../../config/helpers/AuthHelper";
import { LoginUserDTO } from "../../../domain/dto/auth/login";
import { RegisterUserDTO } from "../../../domain/dto/auth/register";


export class AuthService {
    private readonly authHelper = new AuthHelper();

    public async register(dto: RegisterUserDTO) {

        const { name, lastname, email, password } = dto;
        
        const userId = GenerateUUIDHelper.generate();      
        
        const userExists = false;
        if (userExists) {
            throw new ErrorHandler(ErrorTypeName.EMAIL_ALREADY_EXISTS);
        }

        // 2. Hashear la contraseña usando nuestro helper (PasswordEncoder interno)
        const hashedPassword = await this.authHelper.hashPassword(password);
        // 3. Guardar en la base de datos
        // const newUser = await db.user.create({ ...dto, password: hashedPassword });

        return {
            message: "User created successfully",
            // user: newUser
        };
    }

    public async login(dto: LoginUserDTO) {
        // 1. Buscar al usuario por email
        // const user = await db.user.findByEmail(dto.email);
        const user: any = null; // Simulación

        if (!user) {
            throw new ErrorHandler(ErrorTypeName.USER_NOT_FOUND);
        }

        // 2. Validar password usando el helper (PasswordEncoder.compare interno)
        const isPasswordCorrect = await this.authHelper.validatePassword(user, dto.password);
        
        if (!isPasswordCorrect) {
            throw new ErrorHandler(ErrorTypeName.INVALID_PASSWORD);
        }

        // 3. Generar el Token (JWTHelper interno)
        return this.authHelper.createToken(user);
    }
}