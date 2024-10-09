const Game = require('../Models/game');

// GET all games
exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.find().populate('seller_id'); // Récupérer les détails de l'utilisateur (vendeur)
        res.status(200).json(games);
    } catch (error) {
        console.error('Erreur lors de la récupération des jeux:', error); // Log d'erreur
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// GET game by ID
exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id).populate('seller_id');
        if (!game) {
            return res.status(404).json({ message: 'Jeu non trouvé' });
        }
        res.status(200).json(game);
    } catch (error) {
        console.error('Erreur lors de la récupération du jeu:', error); // Log d'erreur
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// POST create a new game
exports.createGame = async (req, res) => {
    try {
        const { title, description, price, event_id, seller_id, stock_quantity, condition } = req.body;

        // Valider que tous les champs requis sont présents
        if (!title || !description || price == null || !event_id || !seller_id || stock_quantity == null || !condition) {
            return res.status(400).json({ message: 'Tous les champs requis doivent être remplis.' });
        }

        const newGame = new Game({
            title,
            description,
            price,
            event_id, // Ajout du champ event_id
            seller_id,
            stock_quantity,
            condition,
        });

        await newGame.save();
        res.status(201).json({ message: 'Jeu créé avec succès', newGame });
    } catch (error) {
        console.error('Erreur lors de la création du jeu:', error); // Log d'erreur
        res.status(500).json({ message: 'Erreur lors de la création du jeu', error: error.message });
    }
};

// PUT update an existing game
exports.updateGame = async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('seller_id');
        if (!updatedGame) {
            return res.status(404).json({ message: 'Jeu non trouvé' });
        }
        res.status(200).json({ message: 'Jeu mis à jour avec succès', updatedGame });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du jeu:', error); // Log d'erreur
        res.status(500).json({ message: 'Erreur lors de la mise à jour du jeu', error: error.message });
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
        console.error('Erreur lors de la suppression du jeu:', error); // Log d'erreur
        res.status(500).json({ message: 'Erreur lors de la suppression du jeu', error: error.message });
    }
};
