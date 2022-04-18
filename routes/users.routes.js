const { Router } = require('express');
const { check } = require('express-validator');
const {
  usersList,
  userData,
  usersCreate,
  usersUpdatePatch,
  usersDelete
} = require('../controllers/users.controller');
const { inputValidation } = require('../middlewares/input-validation');

const {
  emailExists,
  userExistsById,
  isValidRole
} = require('../helpers/db-validators');

const router = Router();

router.get("/", usersList);

router.get("/:id", [
  check('id', 'Is not a valid ID').isMongoId(),
  inputValidation
], userData);

router.post("/", [
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
  check('id', 'Is not a valid ID').isMongoId(),
  check('id').custom( userExistsById ),
  check('role').custom(isValidRole),
  inputValidation
], usersUpdatePatch);

router.delete("/:id", usersDelete);

module.exports = router;
