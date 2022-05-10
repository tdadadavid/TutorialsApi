const express = require('express');
const router = require('./router/routes');

const server = express();
server.use(express.json());

server.use(router);

server.use((req, res, next) => {
    next(new Error(`Cannot handle request to ${req.url}`));
});

server.use((err, req, res,next) => {
    res.status(500).json({
        status: 500,
        message: "Oops! an error occurred",
        error: err.toString()
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT , () => { console.log(`Server listening on port ${PORT}`)});