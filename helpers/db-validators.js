const User = require('../models/user');
const Role = require('../models/role');

const isValidRole = async (role) => {
  const roleExists = await Role.findOne({ role });
  if ( !roleExists ) throw new Error(`Role (${role}) does not exist in database!`);
};

const emailExists = async ( email = '' ) => {
  const emailExists = await User.findOne({ email });
  if ( emailExists ) throw new Error(`Email (${email}) is already registered!`);
};

module.exports = {
  isValidRole,
  emailExists,
};