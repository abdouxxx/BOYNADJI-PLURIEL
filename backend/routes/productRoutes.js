const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Ajouter un produit
router.post("/", upload.single("image"), createProduct);

// Afficher tous les produits
router.get("/", getProducts);

// Modifier un produit
router.put("/:id", upload.single("image"), updateProduct);

// Supprimer un produit
router.delete("/:id", deleteProduct);

module.exports = router;