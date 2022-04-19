const jwtValidate = require('../middlewares/validate-jwt');
const rolesValidation = require('../middlewares/validate-roles');
const inputValidation = require('../middlewares/input-validation');

module.exports = {
  ...jwtValidate,
  ...rolesValidation,
  ...inputValidation,
};