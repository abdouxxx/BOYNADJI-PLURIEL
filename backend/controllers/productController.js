const Product = require("../models/Product");
const Category = require("../models/Category");

// Ajouter un produit
exports.createProduct = async (req, res) => {
  try {
    const {
      nomProduit,
      prix,
      quantite,
      description,
      categorie,
    } = req.body;

    // Vérifier si la catégorie existe
    const category = await Category.findById(categorie);

    if (!category) {
      return res.status(404).json({
        message: "Catégorie introuvable.",
      });
    }

    const product = await Product.create({
      nomProduit,
      prix,
      quantite,
      description,
      categorie,
      image: req.file ? req.file.filename : "",
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Afficher tous les produits
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categorie", "nom")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Modifier un produit
exports.updateProduct = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    ).populate("categorie", "nom");

    if (!product) {
      return res.status(404).json({
        message: "Produit introuvable.",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Produit introuvable.",
      });
    }

    res.json({
      message: "Produit supprimé avec succès.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};