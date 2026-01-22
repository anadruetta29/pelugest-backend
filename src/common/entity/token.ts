export class TokenEntity {
    public accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    public static fromObject(object: { [key: string]: any }): TokenEntity | null {
        if (!object || !object.accessToken) return null;

        return new TokenEntity(
            object.accessToken
        );
    }
}