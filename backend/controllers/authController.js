const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {

    try {

        const { username, password } = req.body;

        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({
                message: "Utilisateur existe déjà"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword
        });

        res.status(201).json(user);

    } catch (error) {

        res.status(500).json(error);
    }
};

exports.login = async (req, res) => {

    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                message: "Utilisateur introuvable"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: "Mot de passe incorrect"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            username: user.username
        });

    } catch (error) {

        res.status(500).json(error);
    }
};