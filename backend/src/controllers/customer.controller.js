import Customer from '../models/customer.model.js';
import cloudinary from '../utils/cloudinary.js';

export const updateProfile = async (req, res) => {
  try {
    const { name, mobile, location } = req.body;  
    const userId = req.user?._id;
    let profilePicUrl;

    if (req.file) {
      const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      const uploadResponse = await cloudinary.uploader.upload(base64);
      profilePicUrl = uploadResponse.secure_url;
    }

    const updateData = { name, mobile, location };
    if (profilePicUrl) updateData.profilePic = profilePicUrl;

    const updatedUser = await Customer.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
