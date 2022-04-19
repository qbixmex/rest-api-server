const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const jwtValidate = async (req = request, res = response, next ) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No Token was provided in the request'
    })
  }

  try {

    // If token is valid, payload is provided
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    // Find user with uid
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'Invalid Token - user does not exist!'
      });
    }

    // Verify if uid has state equals to true
    if (!user.status) {
      return res.status(401).json({
        msg: 'Invalid Token - deleted user!'
      });
    }

    // Set authenticated user to the request.
    req.user = user;

    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Invalid Token'
    })
  }
};

module.exports = {
  jwtValidate,
};