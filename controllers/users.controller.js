const { request, response } = require('express');
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
  const body = req.body;

  const user = new User(body);

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
