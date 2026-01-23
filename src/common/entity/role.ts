export class RoleEntity {
    private constructor(
        public id: string,
        public name: string
    ){}

    static fromObject(object: { [key: string]: any }): RoleEntity {
        return new RoleEntity(
            object.id,
            object.name
        )
    }
}