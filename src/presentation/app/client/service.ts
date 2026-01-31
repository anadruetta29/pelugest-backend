import { RoleRepository } from './../../../data/repository/role-repository';
import { UserEntity } from "../../../common/entity/user";
import { ErrorHandler } from "../../../common/errors/ErrorHandler";
import { ErrorTypeName } from "../../../common/errors/ErrorType";
import { GenerateUUIDHelper } from "../../../config/adapters/generate-UUID";
import { AuthHelper } from "../../../config/helpers/AuthHelper";
import { UserRepository } from "../../../data/repository/user-repository";
import { ClientRepositoryI, CreateClientDTO, RecordStatusRepositoryI, RegexValidator, RoleRepositoryI, UserRepositoryI } from "../../../domain";
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
        if (!RegexValidator.validate(landlinePhoneNumber, RegexValidator.LANDLINE_NUMBER)) {
            throw new ErrorHandler(ErrorTypeName.INVALID_LANDLINE_NUMBER);
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

    public async update() {}
    public async delete() {}
    public async findById() {}
}