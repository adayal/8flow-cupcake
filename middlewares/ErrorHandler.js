/**
 * @author: Amit Dayal
 * Middleware Handler class used in app setup
 * This allows for richer error handling with custom http codes and easier testing
 * Any nonhandled exceptions are treated automatically as HTTP 500 server error
 */
import ResponseException from "../models/ResponseException.js";

const ErrorHandler = (err, req, res, next) => {
    if (err instanceof ResponseException) {
        const {message, statusCode, exception } = err;
        res.status(statusCode).json({
            message: message,
            exception: exception
        });
    } else {
        res.status(500).json({
            message: "Unhandled exception",
            exception: err
        });
    }    
}

export default ErrorHandler