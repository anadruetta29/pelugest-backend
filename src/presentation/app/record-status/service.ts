import { RecordStatusRepositoryI } from '../../../domain';
import { RecordStatusRepository } from '../../../data';
import { ErrorHandler } from '../../../common/errors/ErrorHandler';
import { ErrorTypeName } from '../../../common/errors/ErrorType';

export class RecordStatusService {
    constructor(
        private readonly recordStatusRepository: RecordStatusRepositoryI = new RecordStatusRepository()
    ) {}

    public async findByName(name: string) {
        const status = await this.recordStatusRepository.findByName(name);

        if (!status) {
            throw new ErrorHandler(ErrorTypeName.NOT_FOUND);
        }

        return {
            id: status.id,
            name: status.name
        };
    }
}
