module.exports = {
    err404: (req, res, next) => {
        const error = new Error('Not Found');
        error.status = 404;
        next(error);
    },
    err500: (error, req, res) => {
        res.status(error.status || 500).send({
            error: {
                status: error.status || 500,
                message: error.message || 'Internal Server Error',
            },
        });
    },
};
