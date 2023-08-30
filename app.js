/** BizTime express application. */


const express = require("express");
const ExpressError = require("./expressError");
const app = express();
const companyRouter = require('./routes/companies');
const invoiceRouter = require('./routes/invoices');

app.use(express.json());
app.use('/companies', companyRouter);
app.use('/invoices', invoiceRouter);

/** 404 handler */

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err
  });
});


module.exports = app;
