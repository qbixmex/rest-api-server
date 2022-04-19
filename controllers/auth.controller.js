const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require('../models/user');
const { generateJWT } = require("../helpers/generate-jwt");

const login = ( async (req = request, res = response) => {
  // Getting data from form
  const { email, password } = req.body;

  try {
    // Check if email exists
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(400).json({
        msg: 'User or Password is invalid!'
      })
    }
  
    // Check if user is active
    if (!user.status) {
      return res.status(400).json({
        msg: 'User is no longer exists!'
      })
    }
  
    // Check Password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Password is not correct!'
      })
    }
  
    // Generate JSON Web Token
    const token = await generateJWT( user.id );

    // Respond with user and generated token
    res.json({ user, token });

  } catch (error) {

    return res.status(500).json({
      msg: 'Something went wrong'
    })

  }
  
});

module.exports = {
  login
};