const { request, response } = require('express');

const { Category } = require('../models');

const categoriesList = async (req = request, res = response) => {
  const categories = await Category.find();
  res.json({ categories });
};

const categoryData = (req = request, res = response) => {
  res.json({ route: 'Category List', id: req.params.id });
};

const categoryCreate = (req = request, res = response) => {
  res.json('Category Create');
};

const categoryUpdate = (req = request, res = response) => {
  res.json({ route: 'Category Update', id: req.params.id });
};

const categoryDelete = (req = request, res = response) => {
  res.json({ route: 'Category Delete', id: req.params.id });
};

module.exports = {
  categoriesList,
  categoryData,
  categoryCreate,
  categoryUpdate,
  categoryDelete
};