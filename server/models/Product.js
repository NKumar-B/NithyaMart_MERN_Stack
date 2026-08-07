import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  group: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  badge: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 100
  }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
