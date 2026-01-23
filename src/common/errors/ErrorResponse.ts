import { ErrorHandler } from './ErrorHandler';

export class ErrorResponse {
    public message: string;

    constructor(errorHandler: ErrorHandler) {
        this.message = errorHandler.message;
    }
}