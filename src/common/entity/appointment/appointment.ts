import { AppointmentStatus } from "./appointment-status";
import { ClientEntity } from "../client";
import { UserEntity } from "../user";
import { AppointmentStateFactory } from "./appointment-state.factory";

export class AppointmentEntity {

    private constructor(
        public readonly id: string,
        public readonly startDateTime: Date,
        public estimatedEndDateTime: Date,
        private status: AppointmentStatus,
        public readonly client: ClientEntity,
        public readonly hairdresser: UserEntity
    ){}

    static create(props: {
        id: string;
        startDateTime: Date;
        estimatedEndDateTime: Date;
        status: string;
        client: ClientEntity;
        hairdresser: UserEntity;
    }): AppointmentEntity {

        const state = AppointmentStateFactory.create(props.status);

        return new AppointmentEntity(
            props.id,
            props.startDateTime,
            props.estimatedEndDateTime,
            state,
            props.client,
            props.hairdresser
        );
    }

    getStatus(): string {
        return this.status.getStatus();
    }

    canBeModified(): boolean {
        return this.status.canBeModified();
    }

    private setStatus(state: AppointmentStatus) {
        this.status = state;
    }

    changeState(state: AppointmentStatus) {
        this.setStatus(state);
    }

    start() {
        this.status.start(this);
    }

    attend() {
        this.status.attend(this);
    }

    miss() {
        this.status.miss(this);
    }

    cancel() {
        this.status.cancel(this);
    }

    toJSON() {
        return {
            id: this.id,
            startDateTime: this.startDateTime,
            estimatedEndDateTime: this.estimatedEndDateTime,
            client: this.client,
            hairdresser: this.hairdresser,
            status: this.status.toJSON()  
        };
    }

    static fromObject(object: { [key: string]: any }): AppointmentEntity {

    const state = AppointmentStateFactory.create(object.status);

    return new AppointmentEntity(
        object.id,
        new Date(object.startDateTime),
        new Date(object.estimatedEndDateTime),
        state,
        object.client,
        object.hairdresser
    );
}
}