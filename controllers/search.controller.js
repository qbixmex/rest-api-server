const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types;

// Models Imports
const { User, Category, Product } = require('../models');

const allowedCollection = [
  'users',
  'categories',
  'products',
  'roles'
];

/**
 * Search user by search term.
 * @param {string} searchterm search term from client
 * @param {e.Response<any, Record<string, any>>} res ExpressJs Response
 * @return {Promise<void>} A Promise Response with Status 200 and JSON Body
 */
const searchUsers = async (searchterm, res) => {
  const isMongoID = ObjectId.isValid( searchterm );

  if (isMongoID) {
    const user = await User.findById(searchterm);
    res.json({ results: (user) ? [user] : [] })
  }
};

const search = (req = request, res = response) => {
  const { collection, searchterm } = req.params;

  if ( !allowedCollection.includes(collection) ) {
    return res.status(400).json({
      msg: `Only allowed collections are: (${ allowedCollection })`
    });
  }

  switch (collection) {
    case 'users':
      searchUsers(searchterm, res)
      break;

    case 'categories':
      res.json({ category: searchterm });
      break;

    case 'products':
      res.json({ product: searchterm });
      break;

      case 'roles':
        res.json({ role: searchterm });
      break;
  
    default:
      res.status(500).json({ msg: 'I forgot to make this search' })
      break;
  }
};

module.exports = {
  search,
};