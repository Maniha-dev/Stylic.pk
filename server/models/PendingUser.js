import mongoose from 'mongoose';

const pendingUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    otp: { type: String, required: true },
    otpExpiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now, expires: 600 },
}, { minimize: false });

const PendingUser = mongoose.models.pendingUser || mongoose.model('pendingUser', pendingUserSchema);

export default PendingUser;
