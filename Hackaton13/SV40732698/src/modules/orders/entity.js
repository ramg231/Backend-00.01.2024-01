const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  details: [
  
    {
      course:  { type: Schema.Types.ObjectId, ref: "Course", required: true },
    }
    
  ],
  coupon: { type: Schema.Types.ObjectId, ref: "Coupon" },
  price: Number,
});





const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
