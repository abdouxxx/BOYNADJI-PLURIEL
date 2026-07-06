require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const vehicleRoutes = require("./routes/vehicleRoutes");

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {

    console.log('MongoDB connecté');

})
.catch(err => {

    console.log(err);

});

app.use('/api/auth', authRoutes);
app.use(
    "/api/vehicles",
    vehicleRoutes
);

app.listen(process.env.PORT, () => {

    console.log(
        `Serveur démarré sur le port ${process.env.PORT}`
    );
});