const User = require('../Models/user');
const bcrypt = require('bcrypt');

// GET all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// GET user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// POST create a new user
exports.createUser = async (req, res) => {
    try {
        const { username, email, password, nom, prenom, role } = req.body;
        
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'L\'email est déjà utilisé' });
        }

        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            nom,
            prenom,
            role,
        });

        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès', newUser });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
    }
};

// PUT update an existing user
exports.updateUser = async (req, res) => {
    try {
        const updatedData = req.body;

        // Si un mot de passe est fourni, on le hash avant la mise à jour
        if (updatedData.password) {
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({ message: 'Utilisateur mis à jour avec succès', updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour', error });
    }
};

// DELETE user by ID
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
    }
};
