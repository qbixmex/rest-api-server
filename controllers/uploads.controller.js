const path = require('path');
const { response, request } = require('express');

const loadFile = (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  const { file } = req.files;

  const uploadPath = path.join(__dirname, '../uploads/', file.name);

  file.mv(uploadPath, error => {
    if ( error ) return res.status(500).json({ error });
    res.json({ msg: `File (${file.name}) uploaded to: ${ uploadPath }` });
  });
};

module.exports = {
  loadFile
};
