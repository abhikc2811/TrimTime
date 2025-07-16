import Customer from '../models/customer.model.js';
import Barber from '../models/barber.model.js';
import Otp from '../models/otp.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cloudinary from '../utils/cloudinary.js';
import sendEmail from '../utils/sendEmail.js';

const getModelByRole = (role) => {
  if (role === 'customer') return Customer;
  if (role === 'barber') return Barber;
  return null;
};

export const sendOtp = async (req, res) => {
  const { email, role } = req.body;
  if (!email || !['customer', 'barber'].includes(role)) {
    return res.status(400).json({ message: 'Invalid input' });
  }
  try {
    const Model = getModelByRole(role);
    if (await Model.findOne({ email })) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ email }); 
    await Otp.create({ email, otp, role });
    await sendEmail({
      to: email,
      subject: 'TrimTime OTP Verification',
      text: `Your TrimTime OTP is ${otp}. It expires in 5 minutes.`,
    });
    return res.status(200).json({ message: 'OTP sent to email' });
  } catch (err) {
    console.error('sendOtp error:', err);
    return res.status(500).json({ message: 'Error sending OTP', error: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }
  try {
    const record = await Otp.findOne({ email, otp });
    if (!record) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    await Otp.deleteOne({ _id: record._id }); 
    return res.status(200).json({ message: 'OTP verified', email: record.email, role: record.role });
  } catch (err) {
    console.error('verifyOtp error:', err);
    return res.status(500).json({ message: 'OTP verification failed', error: err.message });
  }
};

export const register = async (req, res) => {
  const { role, email, password, name, mobile, shopName, location } = req.body;
  if (!email || !password || !role || !name || !mobile) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const Model = getModelByRole(role);
  if (!Model) return res.status(400).json({ message: 'Invalid role' });
  try {
    if (await Model.findOne({ email })) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      email,
      password: hashedPassword,
      name,
      mobile,
    };

    if (req.file) {
      const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const uploadRes = await cloudinary.uploader.upload(base64);
      userData.profilePic = uploadRes.secure_url;
    }

    if (role === 'barber') {
      if (!shopName || !location) {
        return res.status(400).json({ message: 'Shop name and location required for barbers' });
      }
      userData.shopName = shopName;
      userData.location = location;
    }

    const user = await Model.create(userData);
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 2 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: 'Registration successful & logged in',
      id: user._id,
      role,
    });
  } catch (err) {
    console.error('register error:', err);
    return res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password, and role are required' });
  }
  try {
    const Model = getModelByRole(role);
    if (!Model) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 2 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: 'Login successful', role });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('logout error:', err);
    return res.status(500).json({ message: 'Logout failed' });
  }
};

export const checkAuth = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const userId = req.user.id;
    let userDoc = await Customer.findById(userId).lean();
    let collectionName = 'customer';
    if (!userDoc) {
      userDoc = await Barber.findById(userId).lean();
      collectionName = 'barber';
    }
    if (!userDoc) {
      return res.status(404).json({ message: 'User not found in any collection' });
    }
    const { password, __v, ...safeUser } = userDoc;
    return res.status(200).json({
      message: 'Authenticated',
      user: { ...safeUser, role: collectionName }
    });
  } catch (err) {
    console.error('checkAuth error:', err);
    return res.status(500).json({ message: 'Auth check failed' });
  }
};
