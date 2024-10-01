const Game = require('../Models/game');

// GET all games
exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.find().populate('user_id'); // Récupérer les détails de l'utilisateur (vendeur)
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// GET game by ID
exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id).populate('user_id');
        if (!game) {
            return res.status(404).json({ message: 'Jeu non trouvé' });
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// POST create a new game
exports.createGame = async (req, res) => {
    try {
        const { title, description, price, user_id, stock_quantity, condition } = req.body;

        const newGame = new Game({
            title,
            description,
            price,
            user_id,
            stock_quantity,
            condition,
        });

        await newGame.save();
        res.status(201).json({ message: 'Jeu créé avec succès', newGame });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du jeu', error });
    }
};

// PUT update an existing game
exports.updateGame = async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user_id');
        if (!updatedGame) {
            return res.status(404).json({ message: 'Jeu non trouvé' });
        }
        res.status(200).json({ message: 'Jeu mis à jour avec succès', updatedGame });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du jeu', error });
    }
};

// DELETE game by ID
exports.deleteGame = async (req, res) => {
    try {
        const deletedGame = await Game.findByIdAndDelete(req.params.id);
        if (!deletedGame) {
            return res.status(404).json({ message: 'Jeu non trouvé' });
        }
        res.status(200).json({ message: 'Jeu supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du jeu', error });
    }
};
