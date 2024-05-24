const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const createProductStripe = async (data) => {
    //crea producto y luego precio
    
    const price = await stripe.prices.create({
        currency: "usd",
        unit_amount: data.price * 100,
        product_data: {
            name: data.name,
            //description: data.description
        },
    })

    return price;
}

const createCustomer = async (data) => {
    const customer = await stripe.customers.create({
        name: data.name,
        email: data.email,
    })

    return customer;
}

const createSessionPayment = async (priceId, customerId) => {
    
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer: customerId,
        line_items: [{
            price: priceId,
            quantity: 1,
        }],
        success_url: "https://example.com/success",
        cancel_url: "https://localhost:4002/cancel",
    })
    return session
}


module.exports = {
    createProductStripe,
    createCustomer,
    createSessionPayment
}