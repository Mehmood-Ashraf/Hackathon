export const errorHandler = (res, statusCode, message, error) => {
    return res.status(statusCode).json({
        status: false,
        message: message,
        error: error
    })
}