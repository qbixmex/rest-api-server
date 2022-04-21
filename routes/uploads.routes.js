const { Router } = require('express');
const { check } = require('express-validator');

// Controllers
const { loadFile } = require('../controllers/uploads.controller');
const { jwtValidate, isAdminRole } = require('../middlewares');

// Routes
const router = Router();

// Upload
router.post('/', [
  jwtValidate,
  isAdminRole
], loadFile);

module.exports = router;