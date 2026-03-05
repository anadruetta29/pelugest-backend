import { ErrorHandler } from "../../../common/errors/ErrorHandler";
import { ErrorTypeName } from "../../../common/errors/ErrorType";
import { GenerateUUIDHelper } from "../../../config/adapters/generate-UUID";
import { AppointmentDetailRepository, AppointmentRepository, RecordStatusRepository } from "../../../data";
import { AppointmentEntity, AppointmentStateFactory } from "../../../common";
import { AppointmentRepositoryI, RecordStatusRepositoryI } from "../../../domain";
import { CreateAppointmentDTO } from "../../../domain/dto/appointment/create";
import { UpdateAppointmentDTO } from "../../../domain/dto/appointment/update";
import { DeleteAppointmentDTO } from "../../../domain/dto/appointment/delete";
import { FindAppointmentByIdDTO } from "../../../domain/dto/appointment/find-by-id";
import { GetAllAppointmentsDTO } from "../../../domain/dto/appointment/get-all";
import { GetAllAppointmentsByStatusDTO } from "../../../domain/dto/appointment/get-all-by-status";
import { AppointmentDetailRepositoryI } from "../../../domain/repository/appointment-detail-repository-interface";
import { ChangeAppointmentStatusDTO } from "../../../domain/dto/appointment/change-appointment-status";

export class AppointmentService {

    constructor(
        private readonly appointmentRepository: AppointmentRepositoryI = new AppointmentRepository(),
        private readonly appointmentDetailRepository: AppointmentDetailRepositoryI = new AppointmentDetailRepository(),
        private readonly recordStatusRepository: RecordStatusRepositoryI = new RecordStatusRepository()
    ) {}

    private mapAppointmentResponse(appointment: any) {

        const statusState = AppointmentStateFactory.create(appointment.getStatus());

        return {
            id: appointment.id,
            startDateTime: appointment.startDateTime,
            estimatedEndDateTime: appointment.estimatedEndDateTime,
            client: appointment.client,
            hairdresser: appointment.hairdresser,
            status: {
                name: appointment.getStatus(),
                label: statusState.toJSON()
            }
        };
    }

    public async create(dto: CreateAppointmentDTO) {

        const { startDateTime, estimatedEndDateTime, clientId, hairdresserId, details } = dto;

        if (estimatedEndDateTime <= startDateTime) {
            throw new ErrorHandler(ErrorTypeName.INVALID_DATE_RANGE);
        }

        if (!details || details.length === 0) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        const recordStatus = await this.recordStatusRepository.findByName("ACTIVE");

        if (!recordStatus) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR);
        }

        const appointmentId = GenerateUUIDHelper.generate();

        const appointment = AppointmentEntity.fromObject({
            id: appointmentId,
            startDateTime,
            estimatedEndDateTime,
            client: { id: clientId },
            hairdresser: { id: hairdresserId },
            status: "RESERVED"
        });

        const detailsToSave = details.map(detail => {

            if (detail.price < 0 || detail.durationMin <= 0) {
                throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
            }

            return {
                id: GenerateUUIDHelper.generate(),
                price: detail.price,
                durationMin: detail.durationMin,
                service: { id: detail.serviceId },
                status: { id: recordStatus.id }
            };

        });

        const savedAppointment = await this.appointmentRepository.save(appointment, detailsToSave);

        return {
            message: "Appointment created successfully",
            appointment: { id: savedAppointment.id }
        };
    }

    public async update(dto: UpdateAppointmentDTO) {

        const { id, startDateTime, estimatedEndDateTime } = dto;

        const appointment = await this.appointmentRepository.findById(id);

        if (!appointment) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        if (estimatedEndDateTime <= startDateTime) {
            throw new ErrorHandler(ErrorTypeName.INVALID_DATE_RANGE);
        }

        if (!appointment.canBeModified()) {
            throw new ErrorHandler(ErrorTypeName.INVALID_STATE_TRANSITION);
        }

        const updatedAppointment = AppointmentEntity.fromObject({
            id: appointment.id,
            startDateTime,
            estimatedEndDateTime,
            status: appointment.getStatus(),
            client: appointment.client,
            hairdresser: appointment.hairdresser
        });

        const saved = await this.appointmentRepository.update(updatedAppointment);

        return {
            message: "Appointment updated successfully",
            appointment: { id: saved.id }
        };
    }

    public async start(dto: ChangeAppointmentStatusDTO) {

        const appointment = await this.appointmentRepository.findById(dto.id);

        if (!appointment) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        appointment.start();

        const updated = await this.appointmentRepository.update(appointment);

        return {
            message: "Appointment started",
            appointment: this.mapAppointmentResponse(updated)
        };
    }

    public async attend(dto: ChangeAppointmentStatusDTO) {

        const appointment = await this.appointmentRepository.findById(dto.id);

        if (!appointment) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        appointment.attend();

        const updated = await this.appointmentRepository.update(appointment);

        return {
            message: "Appointment attended",
            appointment: this.mapAppointmentResponse(updated)
        };
    }

    public async miss(dto: ChangeAppointmentStatusDTO) {

        const appointment = await this.appointmentRepository.findById(dto.id);

        if (!appointment) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        appointment.miss();

        const updated = await this.appointmentRepository.update(appointment);

        return {
            message: "Appointment marked as missed",
            appointment: this.mapAppointmentResponse(updated)
        };
    }

    public async cancel(dto: ChangeAppointmentStatusDTO) {

        const appointment = await this.appointmentRepository.findById(dto.id);

        if (!appointment) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        appointment.cancel();

        const updated = await this.appointmentRepository.update(appointment);

        return {
            message: "Appointment cancelled",
            appointment: this.mapAppointmentResponse(updated)
        };
    }

    public async delete(dto: DeleteAppointmentDTO) {

        const { id } = dto;

        const appointment = await this.appointmentRepository.findById(id);

        if (!appointment) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        if (!appointment.canBeModified()) {
            throw new ErrorHandler(ErrorTypeName.INVALID_STATE_TRANSITION);
        }

        await this.appointmentRepository.delete(id);

        return {
            message: "Appointment deleted successfully"
        };
    }

    public async findById(dto: FindAppointmentByIdDTO) {

        const appointment = await this.appointmentRepository.findById(dto.id);

        if (!appointment) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        return {
            appointment: this.mapAppointmentResponse(appointment)
        };
    }

    public async getAll(_: GetAllAppointmentsDTO) {

        const appointments = await this.appointmentRepository.getAll();

        return {
            appointments: appointments.map(a => this.mapAppointmentResponse(a))
        };
    }

    public async getAllByStatus(dto: GetAllAppointmentsByStatusDTO) {

        const appointments = await this.appointmentRepository.getAllByStatus(dto.status);

        return {
            appointments: appointments.map(a => this.mapAppointmentResponse(a))
        };
    }
}