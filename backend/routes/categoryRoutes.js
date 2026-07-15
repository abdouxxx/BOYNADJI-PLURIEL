const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Ajouter une catégorie
router.post("/", createCategory);

// Afficher toutes les catégories
router.get("/", getCategories);

// Modifier une catégorie
router.put("/:id", updateCategory);

// Supprimer une catégorie
router.delete("/:id", deleteCategory);

module.exports = router;