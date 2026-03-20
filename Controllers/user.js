import User from "../Models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

// User registration
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.json({ message: "User already exists", success: false });

        const hashPass = await bcrypt.hash(password, 10);

        // Insert user into DB
        user = await User.create({ name, email, password: hashPass });

        res.json({
            message: "User registered successfully!",
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

// User login
// User login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.json({ message: "User not found", success: false });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.json({ message: "Invalid credentials", success: false });

        // CORRECT TOKEN
        const token = jwt.sign(
            { userId: user._id },   // <-- ONLY USER ID
            "!@#$%^&*()",
            { expiresIn: "365d" }
        );

        res.json({
            message: `Welcome ${user.name}`,
            token,
            success: true,
        });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};


// Get all users
export const users = async (req, res) => {
    try {
        const Users = await User.find().sort({ createdAt: -1 });
        res.json(Users);

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};



//get profile

export const profile = async (req, res)=> {
    res.json({user:req.user})
    
}