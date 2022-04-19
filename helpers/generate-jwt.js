const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '2h'
    }, (error, token) => {
      if (error) {
        console.log(error);
        reject('Could not generate Token')
      } else {
        resolve( token );
      }
    })
  });
}

module.exports = {
  generateJWT,
};