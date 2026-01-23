import { TokenEntity } from "./token";

export class SessionEntity {
    public token: TokenEntity;

    constructor(token: TokenEntity) {
        this.token = token;
    }

    public static fromObject(object: { [key: string]: any }): SessionEntity | null {
        if (!object || !object.token) return null;

        const tokenInstance = TokenEntity.fromObject(object.token);
        if (!tokenInstance) return null;

        return new SessionEntity(tokenInstance);
    }
}