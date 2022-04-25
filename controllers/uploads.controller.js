const path = require('path');
const fs = require('fs');
const { response, request } = require('express');
const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');
const cloudinary = require('cloudinary').v2;

cloudinary.config( process.env.CLOUDINARY_URL );

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

const updateImageCloudinary = async (req = request, res = response) => {
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
    // Delete image from cloudinary
    const nameArray = model.image.split('/');
    const name      = nameArray[ nameArray.length - 1 ];
    const [ public_id ] = name.split('.');
    cloudinary.uploader.destroy( public_id );
  }

  // Extract from file object temporary file path
  const { tempFilePath } = req.files.file;

  // Upload file to cloudinary.
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

  // Set image name to model
  model.image = secure_url

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

  // Check if image exists in DB
  if ( model.image ) {
    // return image path
    return res.json({ image: model.image });
  }

  // Make image path
  const imagePath = path.join( __dirname, '../assets/no-image.jpg' );

  res.status(404).sendFile( imagePath );
};

module.exports = {
  loadFile,
  updateImage,
  updateImageCloudinary,
  showImage
};
