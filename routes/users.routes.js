const { Router } = require('express');
const { check } = require('express-validator');

// Controllers
const {
  list,
  show,
  store,
  update,
  destroy,
} = require('../controllers/users.controller');

// Validation Middlewares
const {
  jwtValidate,
  isAdminRole,
  hasRole,
  inputValidation,
} = require('../middlewares');

const {
  emailExists,
  userExistsById,
  isValidRole
} = require('../helpers/db-validators');

// Routes
const router = Router();

router.get("/", [
  jwtValidate,
  inputValidation
], list);

router.get("/:id", [  
  jwtValidate,
  inputValidation,
  check('id', 'Is not a valid ID').isMongoId(),
  check('id').custom( userExistsById ),
  inputValidation
], show);

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
], store);

router.patch("/:id", [
  jwtValidate,
  hasRole('ADMIN_ROLE'),
  check('id', 'Is not a valid ID').isMongoId(),
  check('id').custom( userExistsById ),
  check('role').custom(isValidRole),
  inputValidation
], update);

router.delete("/:id", [
  jwtValidate,
  isAdminRole,
  check('id', 'Is not a valid ID').isMongoId(),
  check('id').custom( userExistsById ),
  inputValidation
], destroy);

module.exports = router;
