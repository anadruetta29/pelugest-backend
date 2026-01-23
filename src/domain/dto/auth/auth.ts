import { SessionEntity } from "../../../common/entity/session";

export class AuthUserDTO {
    public readonly session: SessionEntity;

    private constructor(session: SessionEntity) {
        this.session = session;
    }

    static create(object: { [key: string]: any }): [string?, AuthUserDTO?] {
        const { session } = object;

        if (!session) return ["Missing session data"];

        const sessionInstance = session instanceof SessionEntity 
            ? session 
            : SessionEntity.fromObject(session);

        if (!sessionInstance) return ["Invalid session format"];

        return [undefined, new AuthUserDTO(sessionInstance)];
    }
}