const { request, response } = require('express');
const bcryptjs = require("bcryptjs");

const User = require('../models/user');

const usersList = async (req = request, res = response) => {
  const { limit = 5, from = 0, order_by = "_id", asc = true } = req.query;

  const users = await User.find()
    .limit(Number(limit))
    .skip(Number(from))
    .sort({ [order_by]: JSON.parse(asc) ? 1 : -1 })

  res.json({
    users
  });
};

const userData = async (req = request, res = response) => {
  const user = await User.findById(req.params.id);
  return res.json({ user });
};

const usersCreate = async (req = request, res = response) => {
  const { name, email, password, image, role } = req.body;

  const user = new User({ name, email, password, image, role });

  // Encrypt Password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save to database
  await user.save();

  res.json(user);

}

const usersUpdatePatch = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if ( password ) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json(user);
};

const usersDelete = (request, response) => {
  const id = request.params.id;
  response.json({
    msg: "Delete Api - Controller",
    id
  });
};

module.exports = {
  usersList,
  userData,
  usersCreate,
  usersUpdatePatch,
  usersDelete,
};
