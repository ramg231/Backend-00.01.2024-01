const { request, response } = require("express");
const { createProductStripe } = require("../../services/stripe/stripe.service");
const ProductModel = require("./product.entity");

const createProduct = async (req = request, res = response) => {
  //validate admin role

  const data = req.body;

  const productStripe = await createProductStripe(data);

  const newProduct = await ProductModel.create({
    ...data,
    stripeId: productStripe.id,
  });

  return res.json(newProduct);
};

module.exports = {
  createProduct,
};
