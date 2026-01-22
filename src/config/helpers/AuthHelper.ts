import { PasswordEncoder } from "../adapters/PasswordEncoder";
import { JWTHelper } from "./JWTHelper";

export class AuthHelper {

    private passwordEncoder = PasswordEncoder;
    private jwtHelper = new JWTHelper();

    public async hashPassword(password: string): Promise<string> {
        return await this.passwordEncoder.hash(password);
    }

    public async validatePassword(user: any, password: string): Promise<boolean> {
        return await this.passwordEncoder.compare(password, user.password);
    }

    public createToken(user: any): { token: string } {

        return { token: this.jwtHelper.createToken(user) };
    }

  
    public validateToken(rawHeader: string | undefined): string | null {
        if (!rawHeader || rawHeader.trim() === '') return null;

        if (!rawHeader.startsWith('Bearer ')) return null;

        const tokenValue = rawHeader.substring(7).trim();

        try {
            if (this.jwtHelper.validateToken(tokenValue)) {
                return tokenValue;
            }
        } 
        catch (error) {
            return null;
        }

        return null;
    }

    public getSubject(token: string): string {
        return this.jwtHelper.getSubject(token);
    }
}

export const authHelper = new AuthHelper();