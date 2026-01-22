import { User } from './../../../generated/prisma/client';
import { AppointmentStatus } from "./appointment-status";
import { ClientEntity } from "./client";

export class AppointmentEntity {
    private constructor(
        public id: string,
        public startDateTime: Date,
        public estimatedEndDateTime: Date,
        public status: AppointmentStatus,
        public client: ClientEntity,
        public hairdresser: User
    ){}

    static fromObject(object: {[key: string]: any}): AppointmentEntity {
        return new AppointmentEntity(
            object.id,
            object.startDateTime,
            object.estimatedEndDateTime,
            object.status,
            object.client,
            object.hairdresser
        );
    }

    setStatus(state: AppointmentStatus) {
        this.status = state;
    }

    getStatus(): string {
        return this.status.getStatus();
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
}