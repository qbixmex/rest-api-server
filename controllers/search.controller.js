const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types;

// Models Imports
const { User, Category, Product } = require('../models');

const allowedCollection = [
  'users',
  'categories',
  'products',
  'products-category',
  'roles'
];

/**
 * Search user by search term.
 * @param {string} searchTerm search term from client
 * @param {e.Response<any, Record<string, any>>} res ExpressJs Response
 * @return {Promise<void>} A Promise Response with Status 200 and JSON Body
 */
const searchUsers = async (searchTerm, res) => {
  const isMongoID = ObjectId.isValid( searchTerm );

  // Check if is a valid mongodb id
  if (isMongoID) {
    const user = await User.findById(searchTerm);
    return res.json({ results: (user) ? [user] : [] })
  }

  // Regular Expression case insensitive
  const regex = new RegExp(searchTerm, 'i');

  // Search in database
  const users = await User.find({
    $or: [ { name: regex }, { email: regex }, { role: regex } ],
    $and: [ { status: true } ]
  });

  // Respon as json users results
  res.json({ results: users })
};

/**
 * Search categories by search term.
 * @param {string} searchTerm search term from client
 * @param {e.Response<any, Record<string, any>>} res ExpressJs Response
 * @return {Promise<void>} A Promise Response with Status 200 and JSON Body
 */
 const searchCategories = async (searchTerm, res) => {
  const isMongoID = ObjectId.isValid( searchTerm );

  // Check if is a valid mongodb id
  if (isMongoID) {
    const category = await Category.findById(searchTerm);
    return res.json({ results: (category) ? [category] : [] })
  }

  // Regular Expression case insensitive
  const regex = new RegExp(searchTerm, 'i');

  // Search in database
  const categories = await Category.find({ name: regex, status: true });

  // Respon as json users results
  res.json({ results: categories })
};

/**
 * Search products by search term.
 * @param {string} searchTerm search term from client
 * @param {e.Response<any, Record<string, any>>} res ExpressJs Response
 * @return {Promise<void>} A Promise Response with Status 200 and JSON Body
 */
 const searchProducts = async (searchTerm, res) => {
  const isMongoID = ObjectId.isValid( searchTerm );
  
  // Check if is a valid mongodb id
  if (isMongoID) {
    const product = await Product
      .findById(searchTerm)
      .select('name price description available')
      .populate('category', 'name');
    
    if (product) {
      return res.json({ results: (product) ? [product] : [] });
    }

  }

  // Regular Expression case insensitive
  const regex = new RegExp(searchTerm, 'i');

  // Search in database
  const products = await Product
    .find({
      $or: [ { name: regex } ],
      $and: [ { status: true }]
    })
    .select('name price description available')
    .populate('category', 'name');

  if (products) {
    // Respon as json users results
    return res.json({ results: products });
  }
};

/**
 * Search products by category search term.
 * @param {string} searchTerm search term from client
 * @param {e.Response<any, Record<string, any>>} res ExpressJs Response
 * @return {Promise<void>} A Promise Response with Status 200 and JSON Body
 */
 const searchProductsByCategory = async (searchTerm, res) => {
  try {
    const isMongoID = ObjectId.isValid( searchTerm );

    // Check if is a valid mongodb id
    if (isMongoID) {
      const products = await Product
        .find({ category: ObjectId(searchTerm), status: true })
        .select('name price description available')
        .populate('category', 'name');
      return res.json({ results: products })
    }

    const regex = new RegExp( searchTerm, 'i');

    const categories = await Category.find({ name: regex, status: true });

    if (!categories.length) {
      return res.status(404).json({ msg: `There's no results with (${searchTerm}) search term!` });
    }

    const products = await Product.find({
      $or: [...categories.map( c => ({ category: c._id }) )],
      $and: [ { status: true } ]
    })
      .select('name price description available')
      .populate('category', 'name');

    res.json({ results: products });
  } catch (error) {
    res.status(400).json(error);
  }
};

const search = (req = request, res = response) => {
  const { collection, searchterm: searchTerm } = req.params;

  if ( !allowedCollection.includes(collection) ) {
    return res.status(400).json({
      msg: `Only allowed collections are: (${ allowedCollection })`
    });
  }

  switch (collection) {
    case 'users':
      searchUsers(searchTerm, res);
      break;

    case 'categories':
      searchCategories(searchTerm, res);
      break;

    case 'products':      
      searchProducts(searchTerm, res);
      break;

    case 'products-category':
      searchProductsByCategory(searchTerm, res);
      break;

      case 'roles':
        res.json({ role: searchTerm });
      break;
  
    default:
      res.status(500).json({ msg: 'I forgot to make this search' })
      break;
  }
};

module.exports = {
  search,
};