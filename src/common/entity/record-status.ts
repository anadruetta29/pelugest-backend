export class RecordStatusEntity {
    private constructor(
        public id: string,
        public name: string
    ){}

    static fromObject(object: { [key: string]: any }): RecordStatusEntity {
        return new RecordStatusEntity(
            object.id,
            object.name
        )
    }
}