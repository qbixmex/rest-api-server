const { request, response } = require('express');

const { Category } = require('../models');

const list = async (req = request, res = response) => {
  const { limit = 10, from = 0, order_by = '_id', asc= true } = req.query;
  const query = { status: true };

  const [ total, categories ] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .limit(Number(limit))
      .skip(Number(from))
      .sort({ [order_by]: JSON.parse(asc) ? 1 : -1 })
      .populate('user', 'name')
  ]);
  
  res.json({ total, categories });
};

const show = async (req = request, res = response) => {
  const category = await Category.findById(req.params.id).populate('user', 'name');
  res.json(category.status ? category : null);
};

const store = async (req = request, res = response) => {
  const name = req.body.name.toLowerCase();

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
  const category = await new Category(data).populate('user', 'name');

  // Save to DB
  category.save();  

  // Respose as JSON
  res.status(201).json(category);
};

const update = async (req = request, res = response) => {
  const { id } = req.params;
  const {_id, status, user, ...data } = req.body;

  const category = await Category.findById(id).populate('user', 'name');

  // Check is category is not deleted
  if ( !category.status ) {
    return res.status(404).json({
      msg: 'Category not found'
    })
  }

  category.name = data.name.toLowerCase();

  // Update Database
  category.save();

  res.json(category);
};

const destroy = async (req = request, res = response) => {
  // Update status property
  const category = await Category
    .findByIdAndUpdate(req.params.id, { status: false }, { new: true })
    .populate('user', 'name');

  res.json(category);
};

module.exports = {
  list,
  show,
  store,
  update,
  destroy
};