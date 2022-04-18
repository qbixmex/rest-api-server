const User = require('../models/user');
const Role = require('../models/role');

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

module.exports = {
  isValidRole,
  emailExists,
  userExistsById
};