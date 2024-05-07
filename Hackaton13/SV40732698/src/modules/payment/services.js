const { request, response } = require("express");
const OrderModel = require("../orders/entity");
const PaymentModel = require("./entity");

const payment = async (req, res) => {
  try {
    const { order } = req.body;

    const orderResult = await OrderModel.findById(order);

    if (!orderResult) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    const payment = await PaymentModel.create({
      order
    });

    res.json({
      message: "Pago realizado",
      payment,
    });
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error" });
  }
};

module.exports = {
  payment,
};
