import Barber from '../models/barber.model.js';

export const searchBarbers = async (req, res) => {
  const { query } = req.query;

  try {
    const regex = new RegExp(query, 'i'); 
    const results = query
      ? await Barber.find({
          $or: [{ shopName: regex }, { location: regex }]
        })
      : await Barber.find();

    res.status(200).json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server error" });
  }
};