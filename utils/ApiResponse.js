function successResponse(message, data, status = 200){
    res.status(status).json({
        status,
        message,
        data,
    });
    return;
}


function errorResponse(message, status = 400){
    res.status(status).json({
        status,
        message,
    });

    return;
}

module.exports ={
    successResponse,
    errorResponse
}