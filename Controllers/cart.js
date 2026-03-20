import { Cart } from "../Models/Cart.js";


// Add to cart
export const addToCart = async (req, res) => {
    try {
        let { productId, title, price, qty, imgSrc } = req.body;
        const userId = req.user;

        price = Number(price);
        qty = Number(qty);

        if (!productId || !title || isNaN(price) || isNaN(qty) || qty <= 0 || price <= 0) {
            return res.status(400).json({ message: "Invalid product data" });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].qty += qty;
        } else {
            cart.items.push({
                productId,
                title,
                price, // store per unit price
                qty,
                imgSrc
            });
        }

        await cart.save();
        res.json({ message: "Item added to cart", cart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get user cart
export const userCart = async (req, res) => {
    try {
        const userId = req.user;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.json({ message: "Cart is empty", cart: [] });
        }

        res.json({ message: "User cart", cart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Remove product from cart
export const removeProductFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        await cart.save();
        res.json({ message: "Product removed", cart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Clear cart
export const clearCart = async (req, res) => {
    try {
        const userId = req.user;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = [];
        await cart.save();

        res.json({ message: "Cart cleared", cart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Decrease quantity
export const decreaseProductQty = async (req, res) => {
    try {
        let { productId, qty } = req.body;
        const userId = req.user;

        qty = Number(qty);

        if (!productId || isNaN(qty) || qty <= 0) {
            return res.status(400).json({ message: "Invalid data" });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        if (cart.items[itemIndex].qty > qty) {
            cart.items[itemIndex].qty -= qty;
        } else {
            cart.items.splice(itemIndex, 1);
        }

        await cart.save();

        // ✅ Always return cart so frontend can update
        res.json({ message: "item qty decrease", cart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Increase quantity
export const increaseQty = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user;

        if (!productId) {
            return res.status(400).json({ message: "Product ID required" });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        cart.items[itemIndex].qty += 1;

        await cart.save();

        res.json({
            message: "Item added successfully",
            cart
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



