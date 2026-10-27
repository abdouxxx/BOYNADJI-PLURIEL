const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({

    nom: {
        type: String,
        required: true
    },

    prenom: {
        type: String,
        required: true
    },

    telephone: {
        type: String,
        required: true
    },

    email: {
        type: String
    },

    adresse: {
        type: String
    },

    numeroPiece: {
        type: String
    },

    permis: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Client", clientSchema);