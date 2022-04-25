const { request, response } = require('express');
const bcryptjs = require("bcryptjs");
const cloudinary = require('cloudinary').v2;

cloudinary.config( process.env.CLOUDINARY_URL );

const { deleteImage } = require('../helpers');

const User = require('../models/user');

const list = async (req = request, res = response) => {
  const { limit = 5, from = 0, order_by = "_id", asc = true } = req.query;
  const query = { status: true };

  const [count, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .limit(Number(limit))
      .skip(Number(from))
      .sort({ [order_by]: JSON.parse(asc) ? 1 : -1 })
  ]);

  res.json({ count, users });
};

const show = async (req = request, res = response) => {
  const user = await User.findById(req.params.id);
  return res.json(user.status ? user : null);
};

const store = async (req = request, res = response) => {
  const { name, email, password, image, role } = req.body;

  const user = new User({ name, email, password, image, role });

  // Encrypt Password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save to database
  await user.save();

  res.json(user);

}

const update = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if ( password ) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json(user);
};

const destroy = async (req = request, res = response) => {
  // Destructure id from params
  const { id } = req.params;

  const [ { image: imagePath }, deletedUser ] = await Promise.all([
    User.findById(id).select('image'),
    User.findByIdAndUpdate(id, {
      status: false,
      image: ''
    }, { new: true })
  ]);

  // Delete image from cloudinary
  deleteImage(imagePath);

  // Respond json with deleted user
  res.json(deletedUser);
};

module.exports = {
  list,
  show,
  store,
  update,
  destroy,
};
