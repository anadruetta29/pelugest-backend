import { ErrorTypeName, ErrorType } from './ErrorType';

export class ErrorHandler extends Error {
    
    public readonly httpCode: number;

    constructor(errorTypeName: ErrorTypeName) {
        const errorDetail = ErrorType[errorTypeName];
        super(errorDetail.message); 
        this.httpCode = errorDetail.httpCode;
        
        Object.setPrototypeOf(this, ErrorHandler.prototype);
    }

    public toResponse() {
        return {
            message: this.message
        };
    }
}