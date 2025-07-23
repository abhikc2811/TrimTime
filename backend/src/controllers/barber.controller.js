import Barber from '../models/barber.model.js';

export const getBarberById = async (req, res) => {
  const { id } = req.params;
  try {
    const barber = await Barber.findById(id).select('-password'); 
    if (!barber) {
      return res.status(404).json({ message: 'Barber not found' });
    }
    res.json(barber);
  } catch (err) {
    console.error('Error fetching barber:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


