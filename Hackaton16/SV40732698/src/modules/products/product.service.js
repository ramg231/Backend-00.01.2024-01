const { request, response } = require("express");
const { createProductStripe } = require("../../services/stripe/stripe.services")
const ProductModel = require("./product.entity")

const createProduct = async (req = request, res = response) =>{
    //validate admin role
    
    const data = req.body;

    console.log(req.body)

    const productStripe = await createProductStripe(data);
    
    console.log(productStripe)

    const newProduct = await ProductModel.create({
        ...data,
        stripeId: productStripe.id
    })

    return res.json(newProduct)
};

module.exports = {
    createProduct,
}