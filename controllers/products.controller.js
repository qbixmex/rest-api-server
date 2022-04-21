const { Product } = require('../models');

/** LIST */
const list = async (req = request, res = response) => {
  const { limit = 10, from = 0, order_by = '_id', asc= true } = req.query;
  const query = { status: true };

  const [ total, products ] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .limit(Number(limit))
      .skip(Number(from))
      .sort({ [order_by]: JSON.parse(asc) ? 1 : -1 })
      .populate('user', 'name')
      .populate('category', 'name')
  ]);
  
  res.json({ total, products });
};

/** SHOW */
const show = async (req = request, res = response) => {
  const product = await Product.findById(req.params.id)
    .populate([
      { path: 'user', select: 'name' },
      { path: 'category', select: 'name' }
    ]);

  res.json(product.status ? product : null);
};

/** STORE */
const store = async (req = request, res = response) => {
  const { status, user, ...body } = req.body;

  // Check if product exists
  const productDB = await Product.findOne({ name: body.name });

  if ( productDB ) {
    return res.status(400).json({
      msg: `Product (${productDB.name}) already exists!`
    });
  }

  // Prepare data
  const data = {
    user: req.user._id,
    ...body,
  };

  // Create Product Object
  const product = await new Product(data)
    .populate([
      { path: 'user', select: 'name' },
      { path: 'category', select: 'name' }
    ]);

  // Save to DB
  product.save();

  // Respose as JSON
  res.status(201).json(product);
};

/** UPDATE */
const update = async (req = request, res = response) => {
  const { id } = req.params;
  const {_id, status, user, ...data } = req.body;

  // Update updated_at date.
  data.updated_at = new Date();

  const product = await Product.findByIdAndUpdate(id, data, { new: true })
    .populate('user', 'name')
    .populate('category', 'name');

  res.json(product);
};

/** DESTROY */
const destroy = async (req = request, res = response) => {
  // Update status property
  const product = await Product
    .findByIdAndUpdate(req.params.id, { status: false }, { new: true })
    .populate([
      { path: 'user', select: 'name' },
      { path: 'category', select: 'name' }
    ]);

  res.json(product);
};

module.exports = {
  list,
  show,
  store,
  update,
  destroy
};