const { Router } = require('express');
const { check } = require('express-validator');

// Controllers
const { search  } = require('../controllers/search.controller');

// Middlewares
const {
  jwtValidate,
  inputValidation
} = require('../middlewares');

// Routes
const router = Router();

router.get('/:collection/:searchterm', jwtValidate, search);

module.exports = router;