const express = require('express');
const ExpressError = require('./errors');
// const middleware = require('./middleware');
const itemRoutes = require('./items');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/items', itemRoutes);

app.get('/favicon.ico', (req, res) => {
    res.status(204);
})

app.use((req, res, next) => {
    const e = new ExpressError('Page Not Found', 404);
    next(e);
})

app.use((error, req, res, next) => {
    let status = error.status || 500;
    let message = error.msg;

    return res.status(status).json({
        error: {message, status}
    });
})

module.exports = app;