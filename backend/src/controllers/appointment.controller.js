import Appointment from '../models/appointment.model.js';
import Barber from '../models/barber.model.js';
import Customer from '../models/customer.model.js';

export const createAppointment = async (req, res) => {
const { barberId, services, appointmentDate, appointmentTime } = req.body;
  const customerId = req.user._id;

  if (!barberId || !services || !appointmentDate || !appointmentTime) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [barber, customer] = await Promise.all([
      Barber.findById(barberId),
      Customer.findById(customerId)
    ]);

    if (!barber || !customer) {
      return res.status(404).json({ message: 'Barber or Customer not found' });
    }

    const appointment = await Appointment.create({
      barber: barberId,
      customer: customerId,
      services,
      appointmentDate,
      appointmentTime,
    });

    return res.status(201).json({
      message: 'Appointment created successfully',
      appointment,
    });
  } catch (error) {
    console.error('[CREATE_APPOINTMENT_ERROR]', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getCustomerAppointments = async (req, res) => {
  try {
    const customerId = req.user._id;    
    const appointments = await Appointment.find({ customer: customerId })
      .populate({
        path: 'barber',
        select: 'shopName location shopImage'  
      })
      .sort({ appointmentDate: 1, appointmentTime: 1 });
    return res.json(appointments);
  } catch (err) {
    console.error('[GET_CUSTOMER_APPOINTMENTS]', err);
    return res.status(500).json({ message: 'Error fetching appointments' });
  }
};

export const getBarberAppointments = async (req, res) => {
  try {
    const barberId = req.user._id;
    const appointments = await Appointment.find({ barber: barberId })
      .populate({
        path: 'customer',
        select: 'name email'  
      })
      .sort({ appointmentDate: 1, appointmentTime: 1 });
    return res.json(appointments);
  } catch (err) {
    console.error('[GET_BARBER_APPOINTMENTS]', err);
    return res.status(500).json({ message: 'Error fetching appointments' });
  }
};
