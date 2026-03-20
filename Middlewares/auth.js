import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

export const Authenticated = async (req, res, next) => {
    try {
        const token = req.header("Auth");

        if (!token) {
            return res.json({ message: "Login first" });
        }

        // verify token
        const decoded = jwt.verify(token, "!@#$%^&*()");

        // decoded.userId MUST match the name you used when creating token
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.json({ message: "User not exist" });
        }

        req.user = user; // attach user
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid Token", error: error.message });
    }
};
