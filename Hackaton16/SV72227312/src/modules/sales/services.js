const { request, response } = require("express");
const {
  createCustomer,
  createSessionPayment,
} = require("../../services/stripe/stripe.service");
const ProductModel = require("../products/product.entity");
const SalesModel = require("./entity");

const createSale = async (req = request, res = response) => {
  const { productId } = req.body;

  const existProduct = await ProductModel.findByPk(productId);
  if (!existProduct) {
    return res.status(400).json({
      message: `Product with id${productId} not found`,
    });
  }

  const user = req.userAuth;

  ///validar si el usuario tiene un stripeCustomerid ya no crear, si no tiene crear
  const newCustomer = await createCustomer({
    email: user.email,
    name: `${user.firstName + " " + user.lastName ?? ""}`,
  });
  const newPaymentStripe = await createSessionPayment(
    existProduct.stripeId,
    newCustomer.id
  );

  const newSale = await SalesModel.create({
    productId,
    quantity: 1,
    totalPrice: existProduct.price,
    stripeId: newPaymentStripe.id,
  });
  return res.json({
    sale: newSale,
    urlPayment: newPaymentStripe.url,
  });
};

module.exports = {
  createSale,
};
