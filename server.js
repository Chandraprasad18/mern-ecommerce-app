import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Routers
import userRouter from './Routes/user.js';
import productRouter from './Routes/product.js';
import cartRouter from './Routes/cart.js';
import addressRouter from './Routes/address.js';
import paymentRoutes from "./Routes/Payment.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// Home Route
app.get('/', (req, res) => {
    res.json({ message: 'This is home route' });
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use("/api/payment", paymentRoutes);  // MUST BE BEFORE 404

// 404
app.use((req, res) => {
    res.status(404).json({ message: "Route Not Found" });
});

// MongoDB
mongoose.connect("mongodb://localhost:27017/Mernstack")
    .then(() => console.log("MongoDB Connected Successfully....!"))
    .catch((error) => console.log("MongoDB Error:", error));

const port = 1000;
app.listen(port, () => console.log(`Server running on port ${port}`));