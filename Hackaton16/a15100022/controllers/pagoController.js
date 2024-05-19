// controllers/pagoController.js

// Supongamos que estamos utilizando el proveedor de pagos Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Pago = require('../models/Pago');
const Transaccion = require('../models/Transaccion');

// Iniciar el proceso de pago
exports.iniciarPago = async (req, res) => {
  try {
    const { monto, tokenPago, transaccionId } = req.body;

    const cargo = await stripe.charges.create({
      amount: monto * 100, // El monto debe estar en centavos
      currency: 'usd',
      source: tokenPago, // Token de pago generado por Stripe.js
      description: 'Compra en nuestra tienda'
    });

    // Registrar el pago en la base de datos
    const nuevoPago = new Pago({ transaccionId, monto, metodoPago: 'Stripe' });
    await nuevoPago.save();

    // Actualizar el estado de pago de la transacción
    await Transaccion.findByIdAndUpdate(transaccionId, { estadoPago: 'completado' });

    res.status(200).json({ mensaje: 'Pago realizado exitosamente', cargo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Manejar respuesta de pago (puede ser una webhook)
exports.manejarRespuestaPago = async (req, res) => {
  try {
    const { transaccionId, estado } = req.body;

    // Actualizar el estado de pago de la transacción
    await Transaccion.findByIdAndUpdate(transaccionId, { estadoPago: estado });
    
    res.status(200).json({ mensaje: 'Respuesta de pago procesada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
