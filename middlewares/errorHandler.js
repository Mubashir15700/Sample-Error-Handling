const AppError = require("../AppError");

module.exports = (err, req, res, next) => {
    console.log(err.stack);

    let statusCode = 500; // Default status code for internal server errors

    if (err.name === "ValidationError") {
        return res.status(400).send({
            type: "ValidationError",
            details: err.details
        });
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            errorCode: err.errorCode
        });
    }

    res.status(statusCode).send({
        error: {
            message: err.message || "Something went wrong"
        }
    });
};
