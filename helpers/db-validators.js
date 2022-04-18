const Role = require('../models/role');

const isValidRole = async (role) => {
  const roleExists = await Role.findOne({ role });
  if ( !roleExists ) throw new Error(`Role (${role}) does not exist in database!`);
};

module.exports = {
  isValidRole,
};