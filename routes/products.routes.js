const { Router } = require('express');
const { check } = require('express-validator');

// Validation Middlewares
const {
  jwtValidate,
  isAdminRole,
  inputValidation,
} = require('../middlewares');

const {
  ProductExistsById,
  CategoryExistsById,
  ProductIsNotDeleted
} = require('../helpers/db-validators');

// Controllers
const {
  list,
  show,
  store,
  update,
  destroy
} = require('../controllers/products.controller');

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
  check('id').custom( ProductExistsById ),
  inputValidation
], show);

/** STORE */
router.post("/", [
  jwtValidate,
  isAdminRole,
  check('name', 'Name is required').not().isEmpty(),
  check('category', 'Category id is required').not().isEmpty(),
  check('category', 'Is not a valid category id').isMongoId(),
  check('category').custom( CategoryExistsById ),
  check('price', 'Price must be a number').isNumeric(),
  check('description', 'Description is required').not().isEmpty(),
  inputValidation
], store);

/** UPDATE */
router.patch("/:id", [
  jwtValidate,
  isAdminRole,
  check('id', 'Is not a valid ID').isMongoId(),
  check('id').custom( ProductExistsById ),
  check('id').custom( ProductIsNotDeleted ),
  check('name', 'Name is required').not().isEmpty().optional({ checkFalsy: true }),
  check('category', 'Is not a valid category id').optional({ checkFalsy: true }).isMongoId(),
  check('category').custom( CategoryExistsById ).optional({ checkFalsy: true }),
  check('price', 'Price must be a valid number').isNumeric().optional({ checkFalsy: true }),
  check('available', 'Available must be a valid boolean').isBoolean().optional({ checkFalsy: true }),
  inputValidation
], update);

/** DESTROY */
router.delete("/:id", [
  jwtValidate,
  isAdminRole,
  check('id', 'Is not a valid ID').isMongoId(),
  check('id').custom( ProductExistsById ),
  check('id').custom( ProductIsNotDeleted ),
  inputValidation
], destroy);

module.exports = router;