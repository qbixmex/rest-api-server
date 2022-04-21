const path = require('path');
const { response, request } = require('express');
const { v4: uuidv4 } = require('uuid');

const loadFile = (req = request, res = response) => {
  // Check if no files were provided
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  // Destructuring file from files object
  // Note file name is given by front end form or
  // in this case by postman
  const { file } = req.files;

  const fileSplitted = file.name.split('.');
  const extension = fileSplitted[fileSplitted.length - 1];

  const validExtensions = [ 'jpg', 'jpeg', 'png', 'gif' ];

  if (!validExtensions.includes(extension)) {
    return res.status(400).json({
      msg: `File extension .${extension} is not valid, only (${ validExtensions }) are valid!`
    });
  };

  // Unique File Name with UUID
  const uniqueFileName = uuidv4() + '.' + extension; 

  // Path where to upload file
  const uploadPath = path.join(__dirname, '../uploads/', uniqueFileName);

  // Perform file uploading
  file.mv(uploadPath, error => {
    if ( error ) return res.status(500).json({ error });
    res.json({ msg: `File (${file.name}) uploaded to: ${ uploadPath }` });
  });
};

module.exports = {
  loadFile
};
