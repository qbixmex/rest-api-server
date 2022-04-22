const { response, request } = require('express');
const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');

const loadFile = async (req = request, res = response) => {
  // Check if no files were provided
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  try {
    const filename = await uploadFile(req.files);
    res.json({ filename });
  } catch (msg) {
    res.status(400).json(msg);
  }
};

const updateImage = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No user with ID: (${id}) was founded`
        });
      }
    break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No product with ID: (${id}) was founded`
        });
      }
    break;
  
    default:
      return res.status(500).json({ msg: 'I forgot to validate collection'});
  }

  if(!req.files) {
    res.status(400).json({ msg: 'No image was provided' });
    return;
  }

  // Upload file to disk.
  const imageName = await uploadFile(req.files, undefined, collection);

  // Set image name to model
  model.image = imageName

  // Save to database
  await model.save();

  // Respond model as JSON
  res.json( model );
};

module.exports = {
  loadFile,
  updateImage
};
