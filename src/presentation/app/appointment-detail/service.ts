import { ErrorHandler } from "../../../common/errors/ErrorHandler";
import { ErrorTypeName } from "../../../common/errors/ErrorType";
import { GenerateUUIDHelper } from "../../../config/adapters/generate-UUID";
import { AppointmentDetailRepository, RecordStatusRepository } from "../../../data";
import { AppointmentDetailEntity } from "../../../common";
import { CreateAppointmentDetailDTO } from "../../../domain/dto/appointment-detail/create";
import { UpdateAppointmentDetailDTO } from "../../../domain/dto/appointment-detail/update";
import { AppointmentDetailRepositoryI } from "../../../domain/repository/appointment-detail-repository-interface";
import { FindAppointmentDetailsByAppointmentIdDTO } from "../../../domain/dto/appointment-detail/find-by-appointment-id";
import { DeleteAppointmentDetailDTO } from "../../../domain/dto/appointment-detail/delete";
import { FindAppointmentDetailByIdDTO } from "../../../domain/dto/appointment-detail/find-by-id";
import { RecordStatusRepositoryI } from "../../../domain";

export class AppointmentDetailService {

    constructor(
        private readonly appointmentDetailRepository: AppointmentDetailRepositoryI = new AppointmentDetailRepository(),
        private readonly recordStatusRepository: RecordStatusRepositoryI = new RecordStatusRepository()
    ) {}

    public async create(dto: CreateAppointmentDetailDTO) {

        const { price, durationMin, serviceId, appointmentId } = dto;

        if (price < 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        if (durationMin <= 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        const [recordStatus] = await Promise.all([
            this.recordStatusRepository.findByName('ACTIVE')
        ]);

        if (!recordStatus) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR);
        }

        const appointmentDetailId = GenerateUUIDHelper.generate();

        const newDetail = AppointmentDetailEntity.fromObject({
            id: appointmentDetailId,
            price,
            durationMin,
            service: { id: serviceId },
            appointmentId,
            status: { id: recordStatus.id } 
        });

        const savedDetail =
            await this.appointmentDetailRepository.save(newDetail);

        return {
            message: "Appointment detail created successfully",
            appointmentDetail: {
                id: savedDetail.id
            }
        };
    }

    public async update(dto: UpdateAppointmentDetailDTO) {

        const { id, price, durationMin, serviceId, appointmentId, status } = dto;

        const appointmentDetail = await this.appointmentDetailRepository.findById(id);

        if (!appointmentDetail) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        if (price < 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        if (durationMin <= 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        const updatedDetail = AppointmentDetailEntity.fromObject({
            ...appointmentDetail,
            price,
            durationMin,
            service: { id: serviceId },
            appointmentId,
            status
        });

        const savedDetail =
            await this.appointmentDetailRepository.update(updatedDetail);

        return {
            message: "Appointment detail updated successfully",
            appointmentDetail: {
                id: savedDetail.id
            }
        };
    }

    public async delete(dto: DeleteAppointmentDetailDTO) {

        const { id } = dto;
        
        const appointmentDetail = await this.appointmentDetailRepository.findById(id);
    
        if (!appointmentDetail) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }
    
        const recordStatus = await this.recordStatusRepository.findByName('DELETED');
    
        if (!recordStatus) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR);
        }
    
        const deletedAppointmentDetail = AppointmentDetailEntity.fromObject({
            ...appointmentDetail,
            status: { id: recordStatus.id }
        });
    
        await this.appointmentDetailRepository.update(deletedAppointmentDetail);
    
        return {
            message: "Appointment detail deleted successfully"
        };
    }

    public async findById(dto: FindAppointmentDetailByIdDTO) {

        const { id } = dto;

        const appointmentDetail = await this.appointmentDetailRepository.findById(id);

        if (!appointmentDetail) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        return {
            appointmentDetail
        };
    }

    public async findByAppointmentId(dto: FindAppointmentDetailsByAppointmentIdDTO) {

        const { appointmentId } = dto;

        const details =
            await this.appointmentDetailRepository.findByAppointmentId(
                appointmentId
            );

        return {
            appointmentDetails: details
        };
    }
}