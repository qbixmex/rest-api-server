const { request, response } = require('express');
const bcryptjs = require("bcryptjs");

const User = require('../models/user');
const bcrypt = require('bcryptjs/dist/bcrypt');

const usersList = (req = request, res = response) => {
  const {
    name,
    apiKey = null,
    enabled = false,
    page = 1,
    limit = 10
  } = req.query;

  res.json({
    msg: "Get Api - Controller",
    name,
    apiKey: Number(apiKey),
    enabled: Boolean(enabled),
    page: +page,
    limit: +limit
  });
};

const usersCreate = async (req = request, res = response) => {
  const { name, email, password, image, role } = req.body;

  const user = new User({ name, email, password, image, role });

  // Encrypt Password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save to database
  await user.save();

  res.json({
    msg: "User Created Successfully",
    user
  });

}

const usersUpdatePut = (request, response) => {
  const id = request.params.id;
  response.json({
    msg: "Put Api - Controller",
    id
  });
};

const usersUpdatePatch = async (request, response) => {
  const { id } = request.params;
  const { password, google, email, ...rest } = request.body;

  if ( password ) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  response.json({
    msg: `User (${user.name}) updated successfully`,
    user
  });
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
  usersCreate,
  usersUpdatePut,
  usersUpdatePatch,
  usersDelete,
};
