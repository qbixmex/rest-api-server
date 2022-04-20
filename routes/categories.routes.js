const { Router } = require('express');
const { check } = require('express-validator');

// Validation Middlewares
const {
  jwtValidate,
  inputValidation,
} = require('../middlewares');

// Controllers
const {
  categoriesList,
  categoryData,
  categoryCreate,
  categoryUpdate,
  categoryDelete
} = require('../controllers/categories.controller');

// Routes
const router = Router();

router.get("/", [
  jwtValidate,
  inputValidation
], categoriesList);

router.get("/:id", [
  jwtValidate,
  inputValidation
], categoryData);

router.post("/", [
  jwtValidate,
  check('name', 'Name is required').not().isEmpty(),
  inputValidation
], categoryCreate);

router.patch("/:id", [
  jwtValidate,
  inputValidation
], categoryUpdate);

router.delete("/:id", [
  jwtValidate,
  inputValidation
], categoryDelete);

module.exports = router;