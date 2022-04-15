const { Router } = require('express');
const { check } = require('express-validator');
const {
  usersList,
  usersCreate,
  usersUpdatePut,
  usersUpdatePatch,
  usersDelete
} = require('../controllers/users.controller');

const router = Router();

router.get("/", usersList);

router.post("/", [
  check('email', 'Email is not valid!').isEmail()
], usersCreate);

router.patch("/:id", usersUpdatePatch);
router.put("/:id", usersUpdatePut);
router.delete("/:id", usersDelete);

module.exports = router;
