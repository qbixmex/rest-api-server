const jwtValidate     = require('../middlewares/validate-jwt');
const rolesValidation = require('../middlewares/validate-roles');
const inputValidation = require('../middlewares/input-validation');
const fileValidation  = require('../middlewares/fileValidate');

module.exports = {
  ...jwtValidate,
  ...rolesValidation,
  ...inputValidation,
  ...fileValidation
};
