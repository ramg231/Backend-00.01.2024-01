const { request, response } = require("express");
const CouponModel = require("./entity");

const create = async (req = request, res = response) => {
  try {
    const data = req.body;
    const coupon = await CouponModel.findOne({ code: data.code });
    if (coupon) {
      return res.status(400).json({ message: "El cupon ya existe" });
    }
    const couponResult = await CouponModel.create(data);
    return res.json(couponResult);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const findOne = async (req = request, res = response) => {
  const { id } = req.params;
  const couponResult = await CouponModel.findById(id);

  if (!couponResult) {
    return res.status(400).json({ message: "El cupon no existe" });
  }
  res.json(couponResult);
};

const findAll = async (req = request, res = response) => {
  const couponResult = await CouponModel.find();
  res.json(couponResult);
};

const deleteCoupon = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const couponResult = await CouponModel.findByIdAndDelete(id);

    if (!couponResult) {
      return res.status(400).json({ message: "El cupon no existe" });
    }
    return res.json(couponResult);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const update = async (req = request, res = response) => {
  const { id } = req.params;
  const couponData = req.body;

  try {
    const couponResult = await CouponModel.findByIdAndUpdate(id, couponData);
    if (!couponResult) {
      return res.status(404).json({ message: "El cupon no existe" });
    }
    return res.json(couponResult);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  create,
  findOne,
  findAll,
  deleteCoupon,
  update,
};
