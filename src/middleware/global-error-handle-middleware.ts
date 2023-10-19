import { NextFunction, Request, Response } from "express";

import CustomError from "../errors/custom-error";
import ResponseErrorFormat from "../errors/response-error-format";
import ErrorCode from "../errors/error-codes";

const globalErrorHandleMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    let errorResponse: ResponseErrorFormat;

    if (err instanceof CustomError) {
        errorResponse = { errors: err.serializeErrors(), errorCode: err.errorCode };
        return res.status(err.statusCode).json(errorResponse);
    }

    errorResponse = {
        errors: [{ message: err.message || "Something went wrong" }],
        errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
    };
    return res.status(500).json(errorResponse);
};

export default globalErrorHandleMiddleware;
