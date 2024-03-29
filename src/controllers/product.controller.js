import ProductService from "../services/product.service.js";

const productService = new ProductService();

export const getAllProducts = async (req, res) => {
  const message = req.query.message;
  try {
    const result = await productService.getAllProducts();
    res.status(200).render('dashboard', {user: req.user, products: result, message})
  } catch (error) {
    res.status(404).render('error', { message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productService.getProductById(id);
    if (!result) {
      res.status(404).render('error', { message: "¡Lo sentimos! No hemos encontrado el producto 😵" });
    } else {
      res.status(200).render('product', {user: req.user, product: result})
    }
  } catch (error) {
    if (error.path === "_id") {
      res.status(404).render('error', { message: "¡Lo sentimos! No hemos encontrado el producto 😵" });
    } else {
      res.status(404).render('error', { message: error.message });
    }
  }
};

export const getProductCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const result = await productService.getProductCategory(category);
    if (result.length === 0) {
      res.status(404).render('error', { message: `No existen productos en esta categoría` });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(404).render('error', { message: error.message });
  }
};

export const createProduct = async (req, res) => {
  req.body.price = parseFloat(req.body.price) 
  req.body.stock = parseInt(req.body.stock) 
  req.body.category = parseInt(req.body.category).toFixed(2) 
  try {
    const newProduct = await productService.createProduct(req.body);
    if (newProduct) {
      res.status(201).redirect('/productos');
    } else {
      res.status(400).json({ message: "Error" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  let { field, value } = req.body;
  try {
    if (!field || !value) {
      return res.status(404).json({ message: "Verifica todos los campos. Faltaron argumentos" });
    }
    if (field === "stock" || field === "price" || field === "category") {
      value = parseFloat(value).toFixed(2)
    }
    const result = await productService.updateProduct(id, field, value);
    res.redirect(303, `/productos/${id}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productService.deleteProduct(id);
    if (!result) {
      return res.status(404).json({ message: `Producto con id ${id} no existe en nuestra base de datos` });
    } else {
      res.status(200).json({ message: "Producto eliminado correctamente" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
