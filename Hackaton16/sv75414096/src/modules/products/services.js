const { request, response } = require("express");
const { createProductStripe } = require("../../services/stripe/stripe.service");
const ProductModel = require("./product.entity");

const createProduct = async (req = request, res = response) => {
  try {
    // Validar el rol de administrador
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const data = req.body;

    // Crear el producto en Stripe
    const productStripe = await createProductStripe(data);

    // Crear el producto en la base de datos
    const newProduct = await ProductModel.create({
      ...data,
      stripeId: productStripe.id,
    });

    return res.json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createProduct,
};
