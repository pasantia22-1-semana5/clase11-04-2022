export const response = {
    success: function (req,res,message,status) {
        let statusCode = status || 200;
        let data = message || {};
        res.status(statusCode).json({
            error: false,
            status: status,
            body: data
        });
    },
    error: function (req,res,message,status) {
        let statusCode = status || 500;
        let data = message || {};
        res.status(statusCode).json({
            error: true,
            status: status,
            body: data
        });
    }

}