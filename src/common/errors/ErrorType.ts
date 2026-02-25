export enum ErrorTypeName {
    UNAUTHORIZED = 'UNAUTHORIZED',
    NOT_FOUND = 'NOT_FOUND',
    MISSING_REQUIRED_FIELDS = 'MISSING_REQUIRED_FIELDS',
    INVALID_FIELDS = 'INVALID_FIELDS',
    USER_DELETED = 'USER_DELETED',
    PASSWORDS_DO_NOT_MATCH = 'PASSWORDS_DO_NOT_MATCH',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    INVALID_PASSWORD = 'INVALID_PASSWORD',
    EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
    INTERNAL_ERROR = 'INTERNAL_ERROR',
    INVALID_NAME = 'INVALID_NAME',
    INVALID_SURNAME = 'INVALID_SURNAME',
    INVALID_EMAIL = 'INVALID_EMAIL',
    INVALID_TOKEN = 'INVALID_TOKEN',
    INVALID_MOBILE_NUMBER = "INVALID_CELLOPHONE_NUMBER",
    INVALID_LANDLINE_NUMBER = "INVALID_LANDLINE_NUMBER",
    INVALID_FIELD = "INVALID_FIELD",
    INVALID_PAGINATION = "INVALID_PAGINATION",
    APPOINTMENT_ALREADY_ATTENDED = "APPOINTMENT_ALREADY_ATTENDED",
    APPOINTMENT_ALREADY_CANCELLED = "APPOINTMENT_ALREADY_CANCELLED",
    APPOINTMENT_ALREADY_STARTED = "APPOINTMENT_ALREADY_STARTED",
    APPOINTMENT_ALREADY_IN_PROGRESS = "APPOINTMENT_ALREADY_IN_PROGRESS",
    APPOINTMENT_ALREADY_MISSED = "APPOINTMENT_ALREADY_MISSED",
    APPOINTMENT_NOT_STARTED = "APPOINTMENT_NOT_STARTED",
    INVALID_DATE_RANGE = "INVALID_DATE_RANGE"

}

export interface ErrorDetail {
    message: string;
    httpCode: number;
}

export const ErrorType: Record<ErrorTypeName, ErrorDetail> = {
    [ErrorTypeName.UNAUTHORIZED]: { message: "User unauthorized", httpCode: 400},
    [ErrorTypeName.MISSING_REQUIRED_FIELDS]: { message: "Missing required fields", httpCode: 400 },
    [ErrorTypeName.INVALID_FIELDS]: { message: "Invalid fields", httpCode: 400 },
    [ErrorTypeName.USER_DELETED]: { message: "User has been banned", httpCode: 400 },
    [ErrorTypeName.PASSWORDS_DO_NOT_MATCH]: { message: "Passwords do not match", httpCode: 400 },
    [ErrorTypeName.USER_NOT_FOUND]: { message: "User not found", httpCode: 404 },
    [ErrorTypeName.INVALID_PASSWORD]: { message: "Invalid password", httpCode: 400 },
    [ErrorTypeName.EMAIL_ALREADY_EXISTS]: { message: "Email already exists", httpCode: 400 },
    [ErrorTypeName.INTERNAL_ERROR]: { message: "Internal error", httpCode: 500 },
    [ErrorTypeName.INVALID_NAME]: { message: "Invalid name format. Only letters are allowed.", httpCode: 400 },
    [ErrorTypeName.INVALID_SURNAME]: { message: "Invalid surname format. Only letters are allowed.", httpCode: 400 },
    [ErrorTypeName.INVALID_EMAIL]: { message: "Invalid email format.", httpCode: 400 },
    [ErrorTypeName.INVALID_TOKEN]: { message: "Invalid token.", httpCode: 400 },
    [ErrorTypeName.INVALID_MOBILE_NUMBER]: { message: "Invalid cellphone number", httpCode: 400},
    [ErrorTypeName.INVALID_LANDLINE_NUMBER]: { message: "Invalid landline number", httpCode: 400},
    [ErrorTypeName.NOT_FOUND]: { message: "Item not found", httpCode: 400 },
    [ErrorTypeName.INVALID_FIELD]: { message: "Invalid field", httpCode: 400 },
    [ErrorTypeName.INVALID_PAGINATION]: { message: "Invalid pagination parameters", httpCode: 400 },
    [ErrorTypeName.APPOINTMENT_ALREADY_ATTENDED]: { message: "Appointment already attended", httpCode: 400},
    [ErrorTypeName.APPOINTMENT_ALREADY_CANCELLED]: { message: "Appointment already cancelled", httpCode: 400},
    [ErrorTypeName.APPOINTMENT_ALREADY_STARTED]: { message: "Appointment already started", httpCode: 400},
    [ErrorTypeName.APPOINTMENT_ALREADY_IN_PROGRESS]: { message: "Appointment already in progress", httpCode: 400},
    [ErrorTypeName.APPOINTMENT_ALREADY_MISSED]: { message: "Appointment already missed", httpCode: 400},
    [ErrorTypeName.APPOINTMENT_NOT_STARTED]: { message: "Appointment not started", httpCode: 400},
    [ErrorTypeName.INVALID_DATE_RANGE]: { message: "Invalid date range", httpCode: 400},

};