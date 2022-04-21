const { Router } = require('express');

// Controllers
const { search  } = require('../controllers/search.controller');

// Middlewares
const { jwtValidate } = require('../middlewares');

// Routes
const router = Router();

router.get('/:collection/:searchterm', jwtValidate, search);

module.exports = router;