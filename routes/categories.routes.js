const { Router } = require('express');
const { check } = require('express-validator');

// Validation Middlewares
const {
  jwtValidate,
  isAdminRole,
  inputValidation,
} = require('../middlewares');

const {
  CategoryExistsById
} = require('../helpers/db-validators');

// Controllers
const {
  list,
  show,
  store,
  update,
  destroy
} = require('../controllers/categories.controller');

// Routes
const router = Router();

/** LIST */
router.get("/", [
  jwtValidate,
  inputValidation
], list);

/** SHOW */
router.get("/:id", [
  jwtValidate,
  check('id', 'Is not a valid ID').isMongoId(),
  check('id').custom( CategoryExistsById ),
  inputValidation
], show);

/** STORE */
router.post("/", [
  jwtValidate,
  isAdminRole,
  check('name', 'Name is required').not().isEmpty(),
  inputValidation
], store);

/** UPDATE */
router.patch("/:id", [
  jwtValidate,
  isAdminRole,
  check('id', 'Is not a valid ID').isMongoId(),
  check('id').custom( CategoryExistsById ),
  check('name', 'Name is required').not().isEmpty(),
  inputValidation
], update);

/** DESTROY */
router.delete("/:id", [
  jwtValidate,
  isAdminRole,
  check('id', 'Is not a valid ID').isMongoId(),
  check('id').custom( CategoryExistsById ),
  inputValidation
], destroy);

module.exports = router;