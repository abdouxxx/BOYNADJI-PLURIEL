const Vehicle = require("../models/Vehicle");

// Ajouter un véhicule
exports.createVehicle = async (req, res) => {

    try {

        const vehicle = await Vehicle.create(req.body);

        res.status(201).json(vehicle);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// Liste des véhicules
exports.getVehicles = async (req, res) => {

    try {

        const vehicles = await Vehicle.find();

        res.status(200).json(vehicles);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};
//supprimer un vehicule
exports.deleteVehicle = async (req, res) => {

    try {

        await Vehicle.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message: "Véhicule supprimé"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};
// Modifier un véhicule
exports.updateVehicle = async (req, res) => {

    try {

        const vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json(vehicle);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};