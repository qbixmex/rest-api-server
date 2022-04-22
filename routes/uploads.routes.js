const { Router } = require('express');
const { check } = require('express-validator');

// Controllers
const {
  loadFile,
  updateImage,
} = require('../controllers/uploads.controller');

const {
  jwtValidate,
  isAdminRole,
  inputValidation,
} = require('../middlewares');

const { allowedCollection } = require('../helpers');

// Routes
const router = Router();

/** Upload File */
router.post('/', [
  jwtValidate,
  isAdminRole
], loadFile);

/** Upload User Profile Image */
router.patch('/:collection/:id', [
  jwtValidate,
  isAdminRole,
  check('id', 'Id must be a valid mongo id').isMongoId(),
  check('collection')
    .custom( c => allowedCollection(c, ['users', 'products']) ),
  inputValidation
], updateImage);

module.exports = router;