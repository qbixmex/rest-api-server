const path = require('path');
const fs = require('fs');
const { response, request } = require('express');
const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');

const loadFile = async (req = request, res = response) => {
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

  // Delete previous image
  if ( model.image ) {
    // Delete disk image
    const imagePath = path.join( __dirname, '../uploads', collection, model.image );

    if ( fs.existsSync(imagePath) ) {
      fs.unlinkSync(imagePath);
    }
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

const showImage = async (req = request, res = response) => {
  const { id, collection } = req.params;

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

  // Delete previous image
  if ( model.image ) {
    // Delete disk image
    const imagePath = path.join( __dirname, '../uploads', collection, model.image );

    if ( fs.existsSync(imagePath) ) {
      return res.sendFile( imagePath );
    }
  }

  res.json({ msg: `No placeholder was found` });
};

module.exports = {
  loadFile,
  updateImage,
  showImage
};
