import { AppointmentStatusName } from "@prisma/client";
import { AppointmentEntity } from "../../common";

export interface AppointmentRepositoryI {

    findById(id: string): Promise<AppointmentEntity | null>;

    save(appointment: AppointmentEntity, details: any[]): Promise<AppointmentEntity>;

    update(appointment: AppointmentEntity): Promise<AppointmentEntity>;

    delete(id: string): Promise<void>;

    getAll(): Promise<AppointmentEntity[]>;

    getAllByStatus(status: AppointmentStatusName): Promise<AppointmentEntity[]>;

    search(params: { clientId?: string; hairdresserId?: string; skip: number; take: number; }): 
        Promise<{ data: AppointmentEntity[]; total: number; }>;
        
}