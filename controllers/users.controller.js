const { request, response } = require('express');

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

const usersCreate = (req = request, res = response) => {
  const { id, first_name, last_name, age } = req.body;

  res.json({
    msg: "Post Api - Controller",
    body: {
      id,
      first_name,
      last_name,
      age
    },
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
