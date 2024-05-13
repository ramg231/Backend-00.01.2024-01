const { request, response } = require("express");
const UserModel = require("../users/entity");
const CourseModel = require("../courses/entity");
const CouponModel = require("../coupon/entity");
const OrderModel = require("./entity");

const create = async (req = request, res = response) => {
  let { user, details, coupon, price } = req.body;

  try {
    let duplicado = 1;
    let total = 1;
    const userResult = await UserModel.findById(user);
    if (!userResult) {
      return res.status(400).json({ message: "Usuario no existe" });
    }

    let promesa = new Promise((resolve, reject) => {
      details.map(async (data, index) => {
        console.log(data.course)
        const courseResult = await CourseModel.findById(data.course);
        if (!courseResult) {
          return resolve(2);
        } else if (details.length == index + 1) {
          resolve(1);
        }
      });
    });

    duplicado = await promesa;

    if (duplicado === 2) {
      return res.status(400).json({ message: "Almenos 1 curso no existe" });
    }

    const couponResult = await CouponModel.findById(coupon);
    if (!couponResult && coupon) {
      return res.status(400).json({ message: "Cupon no existe" });
    }

    if (couponResult && coupon) {
      price = price - couponResult.discount <= 0
          ? 0
          : price - couponResult.discount;
    }

    const order = await OrderModel.create({
      user: userResult._id,
      details,
      coupon: couponResult?._id || null,
      price,
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findOne = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const order = await OrderModel.findById(id)
      .populate("user", "name email")
      .populate([{
        path: "details", populate: { path: 'course' }
      }])
      .populate("coupon", "code discount");

    if (!order) {
      return res.status(404).json({ message: "La orden no existe" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error al buscar la orden" });
  }
};

const findAll = async (req = request, res = response) => {
  const result = await OrderModel.find({})
    .populate("user", "name email")
    .populate([{
      path: "details", populate: { path: 'course' }
    }])
    .populate("coupon", "code discount");
  res.json(result);
};

const deleteOrder = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const course = await OrderModel.findByIdAndDelete(id);

    if (!course) {
      return res.status(400).json({ message: "La orden no existe" });
    }
    return res.json(course);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const update = async (req = request, res = response) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const order = await OrderModel.findByIdAndUpdate(id, body);

    if (!order) {
      return res.status(404).json({ message: "La orden no existe." });
    }
    return res.json(order);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  create,
  findOne,
  findAll,
  deleteOrder,
  update,
};
