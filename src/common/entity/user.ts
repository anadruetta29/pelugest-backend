import { RecordStatusEntity } from "./record-status";
import { RoleEntity } from "./role";

export class UserEntity {
    private constructor(
        public id: string,
        public name: string, 
        public lastname: string,
        public email: string,
        public password: string,
        public status: RecordStatusEntity,
        public role: RoleEntity
    ){}

    static fromObject(object: {[key: string]: any}): UserEntity {
        return new UserEntity(
            object.id,
            object.name,
            object.lastname,
            object.email,
            object.password,
            object.status,
            object.role
        );
    }
}