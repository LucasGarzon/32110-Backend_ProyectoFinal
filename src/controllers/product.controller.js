import ProductService from "../services/product.service.js";

const productService = new ProductService();

export const getAllProducts = async (req, res) => {
  try {
    const result = await productService.getAllProducts();
    if (result.length === 0) {
      return res.status(200).json({ message: "BD don't have any Product" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productService.getProductById(id);
    if (!result) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProductCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const result = await productService.getProductCategory(category);
    if (result.length === 0) {
      res.status(200).json({ message: `There are no products in this category` });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { field, value } = req.body;
  try {
    if (!field || !value) {
      return res.status(404).json({ message: "Some body data is missing" });
    }
    const result = await productService.updateProduct(id, field, value);
    res.status(201).json({ message: "Product updated successfully", product: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productService.deleteProduct(id);
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json({ message: "Product deleted successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
