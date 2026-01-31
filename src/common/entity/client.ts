export class ClientEntity {
    private constructor(
        public id: string,
        public name: string,
        public surname: string,
        public mobilePhoneNumber: number,
        public landlinePhoneNumber: number
    ) {}

    static fromObject(object: {[key: string]: any}): ClientEntity {
        return new ClientEntity(object.id,
            object.name, 
            object.surname,
            object.mobilePhoneNumber,
            object.landlinePhoneNumber
        )
    }
}