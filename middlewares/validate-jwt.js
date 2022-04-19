const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidate = (req = request, res = response, next ) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No Token was provided in the request'
    })
  }

  try {
    // If token is valid, payload is provided
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    // Save Uid from payload to the request.
    req.uid = payload.uid;
    
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