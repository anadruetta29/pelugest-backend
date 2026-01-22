export class UserEntity {
    private constructor(
        public id: string,
        public name: string, 
        public lastname: string,
        public email: string,
        public password: string
    ){}

    static fromObject(object: {[key: string]: any}): UserEntity {
        return new UserEntity(
            object.id,
            object.name,
            object.lastname,
            object.email,
            object.password
        );
    }
}