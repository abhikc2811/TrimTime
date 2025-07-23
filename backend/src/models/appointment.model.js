import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    barber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barber',
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    services: [
        {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        }
    ],
    appointmentDate: {
        type: Date,
        required: true,
    },
    appointmentTime: {
        type: String,
        required: true,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 
    },
    status: {
        type: String,
        enum: ['booked', 'completed', 'cancelled'],
        default: 'booked',
    },
  }, { timestamps: true }
);

export default mongoose.model('Appointment', appointmentSchema);
