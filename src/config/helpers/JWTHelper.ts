import jwt from 'jsonwebtoken';
import { env } from '../adapters/env';

export class JWTHelper {

    private readonly secret: string = env.JWT.SECRET;
    private readonly expiration: number = env.JWT.EXPIRES_IN; 

    private getClaims<T>(token: string, resolver: (claims: any) => T): T {
        const claims = jwt.verify(token, this.secret);
        return resolver(claims);
    }

    public getSubject(token: string): string {
        return this.getClaims(token, (claims) => claims.sub as string);
    }

    public createToken(user: { email: string }): string {
        const payload = {
            sub: user.email,
            iat: Math.floor(Date.now() / 1000),
        };

        return jwt.sign(payload, this.secret, { 
            expiresIn: this.expiration 
        });
    }

    public validateToken(token: string): boolean {
        try {
            jwt.verify(token, this.secret);
            return true;
        } 
        catch (error) {
            return false;
        }
    }
}