const { Router } = require('express');
const { check } = require('express-validator');

// Controllers
const {
  usersList,
  userData,
  usersCreate,
  usersUpdatePatch,
  usersDelete
} = require('../controllers/users.controller');

// Validation Middlewares
const { jwtValidate } = require('../middlewares/validate-jwt');
const { isAdminRole, hasRole } = require('../middlewares/validate-roles')

const {
  emailExists,
  userExistsById,
  isValidRole
} = require('../helpers/db-validators');

const { inputValidation } = require('../middlewares/input-validation');

// Routes
const router = Router();

router.get("/", [
  jwtValidate,
  inputValidation
], usersList);

router.get("/:id", [  
  jwtValidate,
  inputValidation,
  check('id', 'Is not a valid ID').isMongoId(),
  check('id').custom( userExistsById ),
  inputValidation
], userData);

router.post("/", [
  jwtValidate,
  hasRole('ADMIN_ROLE'),
  check('name', 'Name is required!').not().isEmpty(),
  check('password', 'Password is required!').not().isEmpty(),
  check('password', 'Password must be between 6 to 18 characters!').isLength({ min: 6, max: 18 }),
  check('email', 'Email is not valid!').isEmail(),
  check('email').custom( emailExists ),
  check('email', 'Email is not valid!').isEmail(),
  check('role').custom(isValidRole),
  inputValidation
], usersCreate);

router.patch("/:id", [
  jwtValidate,
  hasRole('ADMIN_ROLE'),
  check('id', 'Is not a valid ID').isMongoId(),
  check('id').custom( userExistsById ),
  check('role').custom(isValidRole),
  inputValidation
], usersUpdatePatch);

router.delete("/:id", [
  jwtValidate,
  isAdminRole,
  check('id', 'Is not a valid ID').isMongoId(),
  check('id').custom( userExistsById ),
  inputValidation
], usersDelete);

module.exports = router;
