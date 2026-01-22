import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../errors/ErrorHandler';
import { ErrorResponse } from '../errors/ErrorResponse';
import { ErrorTypeName } from '../errors/ErrorType';

export const globalExceptionHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    
    if (error instanceof ErrorHandler) {
        const errorResponse = new ErrorResponse(error);
        return res.status(error.httpCode).json(errorResponse);
    }

    console.error(error);
    const internalError = new ErrorHandler(ErrorTypeName.INTERNAL_ERROR);
    return res.status(500).json(new ErrorResponse(internalError));
};