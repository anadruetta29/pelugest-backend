export class AppointmentDetailEntity {
    private constructor(
        public id: string,
        public price: number,
        public durationMin: number
    ) {}

    static fromObject(object: { [key: string]: any }): AppointmentDetailEntity {
        return new AppointmentDetailEntity(
            object.id,
            object.price,
            object.durationMin
        );
    }
}
