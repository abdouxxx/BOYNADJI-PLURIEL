const Client = require("../models/Client");

// Ajouter
exports.createClient = async (req, res) => {

    try {

        const client = await Client.create(req.body);

        res.status(201).json(client);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Liste

exports.getClients = async (req, res) => {

    try {

        const clients = await Client.find();

        res.json(clients);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Modifier

exports.updateClient = async (req, res) => {

    try {

        const client = await Client.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.json(client);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Supprimer

exports.deleteClient = async (req, res) => {

    try {

        await Client.findByIdAndDelete(req.params.id);

        res.json({
            message: "Client supprimé"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};