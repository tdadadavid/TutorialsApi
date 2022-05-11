function successResponse(message, data, res, status = 200){
    res.status(status).json({
        status,
        message,
        data,
    });
}


function errorResponse(message, res, status = 400){
    res.status(status).json({
        status,
        message,
    });
}

function successMessage(message, res, status = 200){
    res.status(status).json({
        status,
        message
    });
}

module.exports ={
    successResponse,
    errorResponse,
    successMessage
}