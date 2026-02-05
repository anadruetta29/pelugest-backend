import { Service } from '@prisma/client';
import { GetAllByStatusDTO } from '../../../domain/dto/client/get-all-by-status';
import { ErrorHandler } from "../../../common/errors/ErrorHandler";
import { ErrorTypeName } from "../../../common/errors/ErrorType";
import { GenerateUUIDHelper } from "../../../config/adapters/generate-UUID";
import { ServiceRepositoryI } from '../../../domain/repository/service-repository-interface';
import { RecordStatusRepositoryI, RegexValidator } from '../../../domain';
import { ServiceRepository } from '../../../data/repository/service-repository';
import { RecordStatusRepository } from '../../../data';
import { CreateServicetDTO } from '../../../domain/dto/service/create';
import { ServiceEntity } from '../../../common';
import { UpdateServiceDTO } from '../../../domain/dto/service/update';
import { DeleteServiceDTO } from '../../../domain/dto/service/delete';
import { FindByIdDTO } from '../../../domain/dto/service/find-by-id';
import { GetAllClientsDTO } from '../../../domain/dto/client/get-all';

export class ServiceService {

    constructor(
        private readonly serviceRepository: ServiceRepositoryI = new ServiceRepository(),
        private readonly recordStatusRepository: RecordStatusRepositoryI = new RecordStatusRepository()
    ) {}

    public async create(dto: CreateServicetDTO) {
        const { name, description, estimatedDurationMin, basePrice } = dto;

        if (!RegexValidator.validate(name, RegexValidator.NAME)) {
            throw new ErrorHandler(ErrorTypeName.INVALID_NAME);
        }
        if (!RegexValidator.validate(description, RegexValidator.DESCRIPTION)) {
            throw new ErrorHandler(ErrorTypeName.INVALID_NAME);
        }

        const [recordStatus] = await Promise.all([
            this.recordStatusRepository.findByName('ACTIVE')
        ]);

        if (!recordStatus) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR);
        }
        
        const serviceId = GenerateUUIDHelper.generate();      

        const newServiceEntity = ServiceEntity.fromObject({
            id: serviceId,
            name,
            description, 
            estimatedDurationMin,
            basePrice,
            status: { id: recordStatus.id } 
        });

        const savedService = await this.serviceRepository.save(newServiceEntity);

        return {
            message: "Service created successfully",
            service: {
                id: savedService.id
            }
        };
    }

    public async update(dto: UpdateServiceDTO) {
        const { id, name, description, estimatedDurationMin, basePrice, status } = dto;


        const service = await this.serviceRepository.findById(id);

        if (!service) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        if (!RegexValidator.validate(name, RegexValidator.NAME)) {
            throw new ErrorHandler(ErrorTypeName.INVALID_NAME);
        }

        if (!RegexValidator.validate(description, RegexValidator.DESCRIPTION)) {
            throw new ErrorHandler(ErrorTypeName.INVALID_NAME);
        }

        if (service.basePrice < 0 || service.estimatedDurationMin < 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD)
        }

        const updatedService = ServiceEntity.fromObject({
            ...service,
            name,
            description,
            estimatedDurationMin, 
            basePrice,
            status
        });

        const savedService = await this.serviceRepository.update(updatedService);

        return {
            message: "Service updated successfully",
            service: {
                id: savedService.id
            }
        };
    }

    public async delete(dto: DeleteServiceDTO) {
        const { id } = dto;

        const service = await this.serviceRepository.findById(id);

        if (!service) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        const recordStatus = await this.recordStatusRepository.findByName('DELETED');

        if (!recordStatus) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR);
        }

        const deletedService = ServiceEntity.fromObject({
            ...service,
            status: { id: recordStatus.id }
        });

        await this.serviceRepository.update(deletedService);

        return {
            message: "Service deleted successfully"
        };
    }

    public async findById(dto: FindByIdDTO) {
        const { id } = dto;

        const service = await this.serviceRepository.findById(id);

        if (!service) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        return {
            service
        };
    }

    public async getAll(dto: GetAllClientsDTO) {
        const services = await this.serviceRepository.getAll();

        if (!services) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR)
        }

        return {
            services
        };
 
    }

    public async getAllByStatus(dto: GetAllByStatusDTO) {
        const { statusId } = dto;

        const services = await this.serviceRepository.getAllByStatus(statusId);

        if (!services) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR)
        }

        return {
            services
        };
    }
}