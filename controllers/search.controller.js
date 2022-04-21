const { response, request } = require('express');

const search = (req = request, res = response) => {
  res.json('Search Home');
};

module.exports = {
  search,
};