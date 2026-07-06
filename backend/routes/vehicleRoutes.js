const express = require("express");

const router = express.Router();

const {
    createVehicle,
    getVehicles,
    deleteVehicle,
    updateVehicle
} = require("../controllers/vehicleController");

router.post("/", createVehicle);

router.get("/", getVehicles);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);


module.exports = router;