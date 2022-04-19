const { request, response } = require("express");

const login = ((req = request, res = response) => {
  const { email, password } = req.body;
  res.json({ email, password });
});

module.exports = {
  login
};