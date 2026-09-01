import User from "../models/User.js";
import PendingUser from "../models/PendingUser.js";
import bcrypt from 'bcryptjs';
import { randomInt } from 'node:crypto';
import jwt from 'jsonwebtoken';
import transporter from '../configs/email.js';

const verificationCodeLifetime = 10 * 60 * 1000;
const resendCooldown = 60 * 1000;

const sendVerificationEmail = (email, otp) => transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your Stylic email',
    text: `Your Stylic verification code is ${otp}. It expires in 10 minutes.`,
    html: `<p>Your Stylic verification code is:</p><h2>${otp}</h2><p>This code expires in 10 minutes.</p>`,
});

//Register User: /api/user/register
export const register = async (req, res) => {
    try {
        const name = req.body.name?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const { password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing details" });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.json({ success: false, message: 'Please enter a valid email address' });
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = randomInt(100000, 1000000).toString();
        const hashedOTP = await bcrypt.hash(otp, 10);
        const otpExpiresAt = new Date(Date.now() + verificationCodeLifetime);
        const pendingUser = await PendingUser.findOne({ email });

        if (pendingUser && pendingUser.createdAt && Date.now() - pendingUser.createdAt.getTime() < resendCooldown) {
            return res.json({ success: false, message: 'Please wait before requesting another code' });
        }

        const pendingRegistration = pendingUser || new PendingUser({ email });
        pendingRegistration.name = name;
        pendingRegistration.password = hashedPassword;
        pendingRegistration.otp = hashedOTP;
        pendingRegistration.otpExpiresAt = otpExpiresAt;
        pendingRegistration.createdAt = new Date();
        await pendingRegistration.save();

        try {
            await sendVerificationEmail(email, otp);
        } catch (error) {
            if (!pendingUser) {
                await PendingUser.deleteOne({ _id: pendingRegistration._id });
            }
            throw error;
        }

        return res.json({
            success: true,
            requiresVerification: true,
            message: 'Verification code sent to your email',
        });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

//LoginUser : /api/user/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.json({ success: false, message: 'Email and Password are required' });

        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.json({ success: false, message: 'Invalid email or password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : "strict",
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.json({ success: true, user: { email: user.email, name: user.name } });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

//Verify User Email: /api/user/verify-email
export const verifyEmail = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const otp = req.body.otp?.trim();

        if (!email || !otp) {
            return res.json({ success: false, message: 'Email and OTP are required' });
        }

        const pendingUser = await PendingUser.findOne({ email });
        if (!pendingUser) {
            return res.json({ success: false, message: 'Verification code not found or expired' });
        }
        if (pendingUser.otpExpiresAt < new Date()) {
            await PendingUser.deleteOne({ _id: pendingUser._id });
            return res.json({ success: false, message: 'Verification code has expired' });
        }

        const isValidOTP = await bcrypt.compare(otp, pendingUser.otp);
        if (!isValidOTP) {
            return res.json({ success: false, message: 'Invalid verification code' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            await PendingUser.deleteOne({ _id: pendingUser._id });
            return res.json({ success: false, message: 'User already exists' });
        }

        await User.create({
            name: pendingUser.name,
            email: pendingUser.email,
            password: pendingUser.password,
        });
        await PendingUser.deleteOne({ _id: pendingUser._id });

        return res.json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

//Check Auth: /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        // Read userId directly from req (set by authUser middleware)
        const userId = req.userId || req.body?.userId;

        if (!userId) {
            return res.json({ success: false, message: 'User ID missing' });
        }

        const user = await User.findById(userId).select("-password");

        return res.json({ success: true, user });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

//Logout User: /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/',
        });
        return res.json({ success: true, message: "Logged Out" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};