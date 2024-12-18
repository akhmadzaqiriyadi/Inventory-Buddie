const prisma = require('../config/database');

// GET product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true, // Menggabungkan data kategori
        rack: true,     // Menggabungkan data rak
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// GET all products
const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany(
      {
        include: {
          category: true, // Menggabungkan data kategori
          rack: true,     // Menggabungkan data rak
        },
      });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// POST create new product
const createProduct = async (req, res) => {
  const { name, categoryId, rackId, stock, imageUrl, purchasePrice, sellingPrice } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        categoryId,
        rackId,
        stock,
        pricePurchase: purchasePrice,
        priceSell: sellingPrice,
        imageUrl 
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// PUT update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, categoryId, rackId, imageUrl, stock, purchasePrice, sellingPrice } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        categoryId,
        rackId, // Tambahkan rackId di sini
        stock,
        pricePurchase: purchasePrice,
        priceSell: sellingPrice,
        imageUrl,
      },
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// DELETE product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = {
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
