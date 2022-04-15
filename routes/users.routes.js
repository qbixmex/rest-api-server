const { Router } = require('express');
const {
  usersList,
  usersCreate,
  usersUpdatePut,
  usersUpdatePatch,
  usersDelete
} = require('../controllers/users.controller');

const router = Router();

router.get("/", usersList);
router.post("/create", usersCreate);
router.patch("/", usersUpdatePatch);
router.put("/", usersUpdatePut);
router.delete("/delete", usersDelete);

module.exports = router;
