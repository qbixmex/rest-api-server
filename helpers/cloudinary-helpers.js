const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

/**
 * Delete image from cloudinary
 * @param {string} imagePath
 * @returns {void}
 */
const deleteImage = ( imagePath = '' ) => {
  if (imagePath) {
    const splittedPath  = imagePath.split('/');
    const imageName     = splittedPath[ splittedPath.length - 1 ];
    const [ public_id ] = imageName.split('.');
    cloudinary.uploader.destroy( public_id );
  }
};

module.exports = { deleteImage };