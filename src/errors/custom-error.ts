import ErrorCode from "./error-codes";

abstract class CustomError extends Error {
    abstract statusCode: number;

    abstract errorCode: ErrorCode;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeErrors(): { message: string; field?: string }[];
}

export default CustomError;
