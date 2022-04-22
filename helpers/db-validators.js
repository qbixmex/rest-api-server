const { User, Category, Product, Role } = require('../models');

const isValidRole = async (role) => {
  const roleExists = await Role.findOne({ role });
  if ( !roleExists ) throw new Error(`Role (${role}) does not exist!`);
};

const emailExists = async ( email = '' ) => {
  const emailExists = await User.findOne({ email });
  if ( emailExists ) throw new Error(`Email (${email}) is already registered!`);
};

const userExistsById = async ( id = '' ) => {
  const userExists = await User.findById(id);
  if ( !userExists ) throw new Error(`Id (${id}) does not exist!`);
};

const CategoryExistsById = async ( id = '' ) => {
  const categoryExists = await Category.findById(id);
  if ( !categoryExists ) throw new Error(`Id (${id}) does not exist!`);
};

const ProductExistsById = async ( id = '' ) => {
  const productExists = await Product.findById(id);
  if ( !productExists ) throw new Error(`Id (${id}) does not exist!`);
};

const ProductIsNotDeleted = async ( id = '' ) => {
  const product = await Product.findById(id);
  if ( !product.status ) throw new Error(`Product no longer exists!`);
};

/**
 * Check is collection given is valid.
 * @param {string} collection Collection to evaluate
 * @param {string[]} collections Allowed Collections
 * @returns {boolean} A boolean if current collection is allowed
 */
const allowedCollection = (collection, collections) => {
  const isIncluded = collections.includes(collection);
  if ( !isIncluded ) {
    throw new Error(`Collection ${collection} is not allowed, only ${collections} are allowed`)
  }
  return true;
};

module.exports = {
  isValidRole,
  emailExists,
  userExistsById,
  CategoryExistsById,
  ProductExistsById,
  ProductIsNotDeleted,
  allowedCollection
};