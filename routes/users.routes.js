const { Router } = require('express');
const { check } = require('express-validator');
const {
  usersList,
  usersCreate,
  usersUpdatePut,
  usersUpdatePatch,
  usersDelete
} = require('../controllers/users.controller');
const { inputValidation } = require('../middlewares/input-validation');

const { isValidRole } = require('../helpers/db-validators');

const router = Router();

router.get("/", usersList);

router.post("/", [
  check('name', 'Name is required!').not().isEmpty(),
  check('password', 'Password is required!').not().isEmpty(),
  check('password', 'Password must be between 6 to 18 characters!').isLength({ min: 6, max: 18 }),
  check('email', 'Email is not valid!').isEmail(),
  check('role').custom( isValidRole ),
  inputValidation
], usersCreate);

router.patch("/:id", usersUpdatePatch);
router.put("/:id", usersUpdatePut);
router.delete("/:id", usersDelete);

module.exports = router;
