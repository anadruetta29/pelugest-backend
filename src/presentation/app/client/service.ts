import { GetAllByStatusDTO } from '../../../domain/dto/client/get-all-by-status';
import { ErrorHandler } from "../../../common/errors/ErrorHandler";
import { ErrorTypeName } from "../../../common/errors/ErrorType";
import { GenerateUUIDHelper } from "../../../config/adapters/generate-UUID";
import { ClientRepositoryI, CreateClientDTO, DeleteClientDTO, FindByIdDTO, RecordStatusRepositoryI, RegexValidator, RoleRepositoryI, UpdateClientDTO, UserRepositoryI } from "../../../domain";
import { ClientRepository, RecordStatusRepository } from '../../../data';
import { ClientEntity } from '../../../common';

export class ClientService {

    constructor(
        private readonly clientRepository: ClientRepositoryI = new ClientRepository(),
        private readonly recordStatusRepository: RecordStatusRepositoryI = new RecordStatusRepository()
    ) {}

    public async create(dto: CreateClientDTO) {
        const { name, surname, mobilePhoneNumber, landlinePhoneNumber } = dto;

        if (!RegexValidator.validate(name, RegexValidator.NAME)) {
            throw new ErrorHandler(ErrorTypeName.INVALID_NAME);
        }
        if (!RegexValidator.validate(surname, RegexValidator.SURNAME)) {
            throw new ErrorHandler(ErrorTypeName.INVALID_SURNAME);
        }
        if (!RegexValidator.validate(mobilePhoneNumber, RegexValidator.MOBILE_NUMBER)) {
            throw new ErrorHandler(ErrorTypeName.INVALID_MOBILE_NUMBER);
        }
        if (dto.landlinePhoneNumber) { 
            if (!RegexValidator.validate(dto.landlinePhoneNumber, RegexValidator.LANDLINE_NUMBER)) {
                throw new ErrorHandler(ErrorTypeName.INVALID_LANDLINE_NUMBER);
            }
        }

        const [recordStatus] = await Promise.all([
            this.recordStatusRepository.findByName('ACTIVE')
        ]);

        if (!recordStatus) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR);
        }
        
        const clientId = GenerateUUIDHelper.generate();      

        const newClientEntity = ClientEntity.fromObject({
            id: clientId,
            name,
            surname,
            mobilePhoneNumber,
            landlinePhoneNumber,
            status: { id: recordStatus.id } 
        });

        const savedClient = await this.clientRepository.save(newClientEntity);

        return {
            message: "Client created successfully",
            user: {
                id: savedClient.id
            }
        };
    }

    public async update(dto: UpdateClientDTO) {
        const { id, name, surname, mobilePhoneNumber, landlinePhoneNumber, status } = dto;

        const client = await this.clientRepository.findById(id);

        if (!client) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        if (!RegexValidator.validate(name, RegexValidator.NAME)) {
            throw new ErrorHandler(ErrorTypeName.INVALID_NAME);
        }

        if (!RegexValidator.validate(surname, RegexValidator.SURNAME)) {
            throw new ErrorHandler(ErrorTypeName.INVALID_SURNAME);
        }

        if (!RegexValidator.validate(mobilePhoneNumber, RegexValidator.MOBILE_NUMBER)) {
            throw new ErrorHandler(ErrorTypeName.INVALID_MOBILE_NUMBER);
        }

        if (dto.landlinePhoneNumber) { 
            if (!RegexValidator.validate(dto.landlinePhoneNumber, RegexValidator.LANDLINE_NUMBER)) {
                throw new ErrorHandler(ErrorTypeName.INVALID_LANDLINE_NUMBER);
            }
        }

        const updatedClient = ClientEntity.fromObject({
            ...client,
            name,
            surname,
            mobilePhoneNumber,
            landlinePhoneNumber,
            status
        });

        const savedClient = await this.clientRepository.update(updatedClient);

        return {
            message: "Client updated successfully",
            client: {
                id: savedClient.id
            }
        };
    }

    public async delete(dto: DeleteClientDTO) {
        const { id } = dto;

        const client = await this.clientRepository.findById(id);

        if (!client) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        const recordStatus = await this.recordStatusRepository.findByName('DELETED');

        if (!recordStatus) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR);
        }

        const deletedClient = ClientEntity.fromObject({
            ...client,
            status: { id: recordStatus.id }
        });

        await this.clientRepository.update(deletedClient);

        return {
            message: "Client deleted successfully"
        };
    }

    public async findById(dto: FindByIdDTO) {
        const { id } = dto;

        const client = await this.clientRepository.findById(id);

        if (!client) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        return {
            client
        };
    }

    public async getAllByStatus(dto: GetAllByStatusDTO) {
        const { statusId } = dto;

        const clients = await this.clientRepository.getAllByStatus(statusId);

        if (!clients) {
            throw new ErrorHandler(ErrorTypeName.INTERNAL_ERROR)
        }

        return {
            clients
        };
    }
}