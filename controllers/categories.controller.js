const { request, response } = require('express');

const { Category } = require('../models');

const categoriesList = async (req = request, res = response) => {
  const query = { status: true };

  const [ count, categories ] = await Promise.all([
    Category.countDocuments(query),
    await Category.find(query)
  ]);
  
  res.json({ count, categories });
};

const categoryData = (req = request, res = response) => {
  res.json({ route: 'Category List', id: req.params.id });
};

const categoryCreate = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  // Check if category is already exists
  const categoryDB = await Category.findOne({ name });

  if ( categoryDB ) {
    return res.status(400).json({
      msg: `Category (${categoryDB.name}) already exists!`
    });
  }

  // Prepare data
  const data = {
    name,
    user: req.user._id
  };

  // Create Category Object
  const category = await new Category(data);

  // Save to DB
  category.save();  

  // Respose as JSON
  res.status(201).json(category);
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