import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: String },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true
  },
  customerPhone: {
    type: String,
    default: ''
  },
  module: {
    type: String,
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['upi', 'card', 'cash'],
    default: 'upi'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed'
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
