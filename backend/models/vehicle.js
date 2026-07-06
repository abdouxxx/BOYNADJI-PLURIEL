const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    marque: {
        type: String,
        required: true
    },

    modele: {
        type: String,
        required: true
    },

    annee: {
        type: Number,
        required: true
    },

    immatriculation: {
        type: String,
        required: true,
        unique: true
    },

    prixJour: {
        type: Number,
        required: true
    },

    statut: {
        type: String,
        enum: [
            "Disponible",
            "Loué",
            "Maintenance"
        ],
        default: "Disponible"
    },

    photo: {
    type: String,
    default: ""
},

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "Vehicle",
    vehicleSchema
);