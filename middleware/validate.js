const ExpressError = require('../expressError');
const jsonschema = require('jsonschema');


function validateSchema(schema){
    return(req, res, next) => {
        const result = jsonschema.validate(req.body, schema);
        if(!result.valid){
            let listofErrors = result.errors.map(e => e.stack);
            let error = new ExpressError(listofErrors, 400);
            return next(error);
        }
        next();
    }
}

module.exports = {validateSchema};