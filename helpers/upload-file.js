const path = require('path');
const { v4: uuidv4 } = require('uuid');

/**
 * Upload file to server
 * @param {fileUpload.FileArray} files Nomrally is req.files
 * @param {string[]} validExtensions By default is [ 'jpg', 'jpeg', 'png', 'gif' ].
 * @param {string} folder You can set a custom folder inside uploads at root directory
 * @returns {Promise<string>} File Path
 */
const uploadFile = (files, validExtensions = [ 'jpg', 'jpeg', 'png', 'gif' ], folder = '') => {
  return new Promise((resolve, reject) => {
    // Destructuring file from files object
    // Note file name is given by front end form or
    // in this case by postman
    const { file } = files;

    const fileSplitted = file.name.split('.');
    const extension = fileSplitted[fileSplitted.length - 1];

    if (!validExtensions.includes(extension)) {
      reject(`File extension .${extension} is not valid, only (${ validExtensions }) are valid!`);
      return;
    };

    // Unique File Name with UUID
    const uniqueFileName = uuidv4() + '.' + extension; 

    // Path where to upload file
    const uploadPath = path.join(__dirname, '../uploads/', folder, uniqueFileName);

    // Perform file uploading
    file.mv(uploadPath, error => {
      if ( error ) return reject(error);
      resolve(uniqueFileName);
    });
  });
};

module.exports = { uploadFile };