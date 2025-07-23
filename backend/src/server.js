import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import barberRoutes from './routes/barber.routes.js';
import customerRoutes from './routes/customer.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/barber', barberRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api', appointmentRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});