const { validationResult } = require('express-validator');

const inputValidation = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json(errors);
  }
  next();
};

module.exports = {
  inputValidation,
};