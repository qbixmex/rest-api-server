const { request, response } = require('express');

const usersList = (request, response) => {
  response.json({
    msg: "Get Api - Controller"
  });
};

const usersCreate = (request, response) => {
  response.json({
    msg: "Post Api - Controller"
  });
}

const usersUpdatePut = (request, response) => {
  response.json({
    msg: "Put Api - Controller"
  });
};

const usersUpdatePatch = (request, response) => {
  response.json({
    msg: "Patch Api - Controller"
  });
};

const usersDelete = (request, response) => {
  response.json({
    msg: "Delete Api - Controller"
  });
};

module.exports = {
  usersList,
  usersCreate,
  usersUpdatePut,
  usersUpdatePatch,
  usersDelete,
};
