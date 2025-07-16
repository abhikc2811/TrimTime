import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const barberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    shopName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10}$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    profilePic: {
      type: String,
      default: '', 
    },
    shopImage: {
      type: String,
      default: '', 
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    services: {
      type: [serviceSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Barber', barberSchema);

