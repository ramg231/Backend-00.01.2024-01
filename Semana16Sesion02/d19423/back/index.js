const cors = require("cors");
const express = require("express");
require("dotenv").config();
const Culqi = require('culqi-node');
const culqi = new Culqi({
    privateKey: 'sk_test_SWyklAB8rIyjXmje',
});

const app = express();

// Middlewares here 
app.use(express.json());
app.use(cors());

// Routes here 
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/api/process/pay", async (req, res) => {
    const product = req.body;
    console.log(product);
    try {
        const charge = await culqi.charges.createCharge({
            amount: product.amount * 100,
            currency_code: product.currency_code,
            email: product.email,
            installments: product.installments,
            description: product.description,
            source_id: product.token,

        }).then(respuesta => {
            console.log(respuesta);
            res.send({res:"recibido", respuesta});
        });



    } catch (error) {
        console.log(error)
    }
});


app.listen(8000, () => {
    console.log("Server started at port 8000");
}); 