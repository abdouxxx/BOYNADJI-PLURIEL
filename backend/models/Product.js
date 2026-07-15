const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nomProduit: {
      type: String,
      required: true,
      trim: true,
    },

    prix: {
      type: Number,
      required: true,
      min: 0,
    },

    quantite: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      default: "",
    },

    categorie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);