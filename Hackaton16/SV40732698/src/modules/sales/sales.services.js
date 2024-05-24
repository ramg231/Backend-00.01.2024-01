const { request, response } = require("express");
const { 
    createCustomer,
    createSessionPayment,
} = require("../../services/stripe/stripe.services");
const ProductModel = require("../products/product.entity")
const SalesModel = require("./sales.entity")

const createSale = async (req = request, res = response) => {
    const { productId } = req.body;
    
    const existProduct = await ProductModel.findByPk(productId)
    if(!existProduct){
        return res.status(400).json({
            message: `Product with ID: ${productId} not found.`
        });
    }

    const user = req.userAuth;
    console.log(user)

    //validar si el usuario tiene un stripeCustomerId ya no crear, si no tiene crear

    /* const newCustomer = await createCustomer({
        email: user.email,
        name: `${user.firstName + " " + user.lastName ?? ""}`,
    })

    const newPaymentStripe = await createSessionPayment(
        existProduct.stripeId,
        newCustomer.id
    );

    console.log(newPaymentStripe) */


    const newSale = await SalesModel.create({
        productId,
        quantity: 1,
        totalPrice: existProduct.price,
        stripeId:"price_1PHyXARvK5T36779TYKaSRvC"
    })
    return res.json({
        sale: newSale,
        urlPayment:""
    })
}
module.exports = {
    createSale,
}