import Product from "../models/product.model.js";

export default class ProductService {
  async getAllProducts() {
    return await Product.find();
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async getProductCategory(category) {
    return await Product.find({ category });
  }

  async createProduct(productData) {
    return await Product.create(productData);
  }

  async updateProduct(id, field, value) {
    const product = await Product.findById(id);
    if (!product) throw new Error(`No se ha encontrado un producto con id ${id}`);
    product[field] = value;
    await product.save();
    return product;
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

