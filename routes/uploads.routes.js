const { Router } = require('express');
const { check } = require('express-validator');

// Controllers
const {
  loadFile,
  updateImage,
  showImage,
} = require('../controllers/uploads.controller');

const {
  jwtValidate,
  isAdminRole,
  inputValidation,
  fileValidation,
} = require('../middlewares');

const { allowedCollection } = require('../helpers');

// Routes
const router = Router();

/** Upload File */
router.post('/', [
  jwtValidate,
  isAdminRole,
  fileValidation,
], loadFile);

/** Upload Image */
router.patch('/:collection/:id', [
  jwtValidate,
  isAdminRole,
  check('id', 'Id must be a valid mongo id').isMongoId(),
  check('collection')
  .custom( c => allowedCollection(c, ['users', 'products']) ),
  fileValidation,
  inputValidation
], updateImage);

/** View Image */
router.get('/:collection/:id', [
  check('id', 'Id must be a valid mongo id').isMongoId(),
  check('collection')
    .custom( c => allowedCollection(c, ['users', 'products']) ),
  inputValidation
], showImage);

module.exports = router;