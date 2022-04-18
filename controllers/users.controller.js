const { request, response } = require('express');
const bcryptjs = require("bcryptjs");

const User = require('../models/user');

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

  // Verified email exists
  const emailExists = await User.findOne({ email });

  if ( emailExists ) {
    return res.status(400).json({
      msg: "Email is already registered"
    })
  }

  // Encrypt Password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save to database
  await user.save();

  res.json({
    msg: "User Created Successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      status: user.status,
      created_at: user.created_at
    }
  });

}

const usersUpdatePut = (request, response) => {
  const id = request.params.id;
  response.json({
    msg: "Put Api - Controller",
    id
  });
};

const usersUpdatePatch = (request, response) => {
  const id = request.params.id;
  response.json({
    msg: "Patch Api - Controller",
    id
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
