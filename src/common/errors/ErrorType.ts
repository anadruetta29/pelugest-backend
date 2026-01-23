export enum ErrorTypeName {
    MISSING_REQUIRED_FIELDS = 'MISSING_REQUIRED_FIELDS',
    INVALID_FIELDS = 'INVALID_FIELDS',
    USER_DELETED = 'USER_DELETED',
    PASSWORDS_DO_NOT_MATCH = 'PASSWORDS_DO_NOT_MATCH',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    INVALID_PASSWORD = 'INVALID_PASSWORD',
    EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
    INTERNAL_ERROR = 'INTERNAL_ERROR',
    INVALID_NAME = 'INVALID_NAME',
    INVALID_LASTNAME = 'INVALID_LASTNAME',
    INVALID_EMAIL = 'INVALID_EMAIL',
    INVALID_TOKEN = 'INVALID_TOKEN'
}

export interface ErrorDetail {
    message: string;
    httpCode: number;
}

export const ErrorType: Record<ErrorTypeName, ErrorDetail> = {
    [ErrorTypeName.MISSING_REQUIRED_FIELDS]: { message: "Missing required fields", httpCode: 400 },
    [ErrorTypeName.INVALID_FIELDS]: { message: "Invalid fields", httpCode: 400 },
    [ErrorTypeName.USER_DELETED]: { message: "User has been banned", httpCode: 400 },
    [ErrorTypeName.PASSWORDS_DO_NOT_MATCH]: { message: "Passwords do not match", httpCode: 400 },
    [ErrorTypeName.USER_NOT_FOUND]: { message: "User not found", httpCode: 404 },
    [ErrorTypeName.INVALID_PASSWORD]: { message: "Invalid password", httpCode: 400 },
    [ErrorTypeName.EMAIL_ALREADY_EXISTS]: { message: "Email already exists", httpCode: 400 },
    [ErrorTypeName.INTERNAL_ERROR]: { message: "Internal error", httpCode: 500 },
    [ErrorTypeName.INVALID_NAME]: { message: "Invalid name format. Only letters are allowed.", httpCode: 400 },
    [ErrorTypeName.INVALID_LASTNAME]: { message: "Invalid lastname format. Only letters are allowed.", httpCode: 400 },
    [ErrorTypeName.INVALID_EMAIL]: { message: "Invalid email format.", httpCode: 400 },
    [ErrorTypeName.INVALID_TOKEN]: { message: "Invalid token.", httpCode: 400 },
};