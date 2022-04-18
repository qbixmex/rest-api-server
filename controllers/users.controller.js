const { request, response } = require('express');
const bcryptjs = require("bcryptjs");

const User = require('../models/user');

const usersList = async (req = request, res = response) => {
  const { limit = 5, from = 0, order_by = "_id", asc = true } = req.query;
  const query = { status: true };

  const [count, users] = await Promise.all([
    User.countDocuments(query),
    await User.find(query)
      .limit(Number(limit))
      .skip(Number(from))
      .sort({ [order_by]: JSON.parse(asc) ? 1 : -1 })
  ]);

  res.json({ count, users });
};

const userData = async (req = request, res = response) => {
  const user = await User.findById(req.params.id);
  return res.json(user.status ? user : null);
};

const usersCreate = async (req = request, res = response) => {
  const { name, email, password, image, role } = req.body;

  const user = new User({ name, email, password, image, role });

  // Encrypt Password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save to database
  await user.save();

  res.json(user);

}

const usersUpdatePatch = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if ( password ) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json(user);
};

const usersDelete = async (req = request, res = response) => {
  // To delete Phisically
  // const user = await User.findByIdAndDelete(req.params.id);

  // Just Update status property
  const user = await User.findByIdAndUpdate(req.params.id, { status: false }, { new: true });

  res.json(user);
};

module.exports = {
  usersList,
  userData,
  usersCreate,
  usersUpdatePatch,
  usersDelete,
};
