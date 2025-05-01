const errorHandler = (err, req, res, next) => {
    console.error('Error stack:', err.stack);

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        error: {
            message: err.message || 'Something went wrong',
            status: statusCode,
        },
    });
};

module.exports = errorHandler;
