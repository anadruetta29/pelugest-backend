import { AppointmentStatusName } from "@prisma/client";
import { ErrorHandler, ErrorTypeName } from "../../../common";

export class SearchAppointmentDTO {

    private constructor(
        public date: Date | undefined,
        public status: AppointmentStatusName | undefined,
        public clientId: string | undefined,
        public hairdresserId: string | undefined,
        public page: number,
        public limit: number
    ) {}

    get skip(): number {
        return (this.page - 1) * this.limit;
    }

    get take(): number {
        return this.limit;
    }

    static create(object: { [key: string]: any }): [string?, SearchAppointmentDTO?] {

        const {
            date,
            status,
            clientId,
            hairdresserId,
            page = 1,
            limit = 10
        } = object;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        if (isNaN(pageNumber) || pageNumber <= 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_PAGINATION);
        }

        if (isNaN(limitNumber) || limitNumber <= 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_PAGINATION);
        }

        const parsedDate = date ? new Date(date) : undefined;

        if (date && isNaN(parsedDate!.getTime())) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        const parsedStatus = status as AppointmentStatusName | undefined;

        return [
            undefined,
            new SearchAppointmentDTO(
                parsedDate,
                parsedStatus,
                clientId,
                hairdresserId,
                pageNumber,
                limitNumber
            )
        ];
    }
}