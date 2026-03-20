import Product from "../Models/product.js";

// Add Product
export const addProduct = async (req, res) => {
  const { title, description, price, category, qty, imgSrc } = req.body;

  try {
    const product = await Product.create({
      title,
      description,
      price,
      category,
      qty,
      imgSrc
    });

    res.json({ message: "Product added successfully!", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All products", products });
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

// Get product by ID
export const getProductByid = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (!product) return res.status(404).json({ message: "Invalid Id" });

  res.json({ message: "Specific product", product });
};

// Update product
export const updateProductByid = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

  if (!product) return res.status(404).json({ message: "Invalid Id" });

  res.json({ message: "Product updated", product });
};

// Delete product
export const deleteProductByid = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);

  if (!product) return res.status(404).json({ message: "Invalid Id" });

  res.json({ message: "Product deleted successfully" });
};
