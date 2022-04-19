const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { inputValidation } = require('../middlewares/input-validation');

const router = Router();

router.post('/login', [
  check('email', 'Email is required').not().isEmpty(),
  check('email', 'Invalid Email').isEmail(),
  check('password', 'Password is required!').not().isEmpty(),
  inputValidation
], login);

module.exports = router;