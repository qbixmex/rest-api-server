const { response, request } = require('express');
const { uploadFile } = require('../helpers');

const loadFile = async (req = request, res = response) => {
  // Check if no files were provided
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  const filename = await uploadFile(req.files);

  res.json({ filename });
};

module.exports = {
  loadFile
};
