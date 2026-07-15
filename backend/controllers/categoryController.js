const Category = require("../models/Category");

// Ajouter une catégorie
exports.createCategory = async (req, res) => {
  try {
    const { nom } = req.body;

    if (!nom) {
      return res.status(400).json({
        message: "Le nom de la catégorie est obligatoire."
      });
    }

    const existe = await Category.findOne({ nom });

    if (existe) {
      return res.status(400).json({
        message: "Cette catégorie existe déjà."
      });
    }

    const category = await Category.create({ nom });

    res.status(201).json(category);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Afficher toutes les catégories
exports.getCategories = async (req, res) => {
  try {

    const categories = await Category.find().sort({ nom: 1 });

    res.json(categories);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Modifier une catégorie
exports.updateCategory = async (req, res) => {
  try {

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        message: "Catégorie introuvable."
      });
    }

    res.json(category);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Supprimer une catégorie
exports.deleteCategory = async (req, res) => {
  try {

    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Catégorie introuvable."
      });
    }

    res.json({
      message: "Catégorie supprimée avec succès."
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};