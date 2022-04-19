const { request, response } = require('express');

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'Cannot verify admin role because is not a valid authenticated user!'
    });
  }

  const { role, name } = req.user;

  if ( role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `User (${ name }) cannot perform this action because is not an admin role`
    });
  }

  next();
};

module.exports = { isAdminRole };