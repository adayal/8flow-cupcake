/**
 * @author: Amit Dayal
 * Custom exception handling
 */
class ResponseException extends Error {
    constructor(message = "Something went wrong", statusCode = 500, exception) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.exception = exception;
    }
}

export default ResponseException;