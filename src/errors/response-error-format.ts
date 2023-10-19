import ErrorCode from "./error-codes";

class ResponseErrorFormat {
    constructor(
        public errors: { message: string; field?: string | undefined }[],
        public errorCode: ErrorCode
    ) {}
}

export default ResponseErrorFormat;
