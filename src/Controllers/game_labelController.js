const GameLabel = require('../Models/game_label');

// GET all game labels
exports.getAllGameLabels = async (req, res) => {
    try {
        const gameLabels = await GameLabel.find().populate('game_id buyer_id'); // Récupère les détails du jeu et du vendeur
        res.status(200).json(gameLabels);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// GET game label by ID
exports.getGameLabelById = async (req, res) => {
    try {
        const gameLabel = await GameLabel.findById(req.params.id).populate('game_id buyer_id');
        if (!gameLabel) {
            return res.status(404).json({ message: 'Étiquette non trouvée' });
        }
        res.status(200).json(gameLabel);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// POST create a new game label
exports.createGameLabel = async (req, res) => {
    try {
        const { game_id, buyer_id } = req.body;

        const newGameLabel = new GameLabel({
            game_id,
            buyer_id,
        });

        await newGameLabel.save();
        res.status(201).json({ message: 'Étiquette de jeu créée avec succès', newGameLabel });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'étiquette de jeu', error });
    }
};

// PUT update an existing game label
exports.updateGameLabel = async (req, res) => {
    try {
        const updatedGameLabel = await GameLabel.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('game_id buyer_id');
        if (!updatedGameLabel) {
            return res.status(404).json({ message: 'Étiquette non trouvée' });
        }
        res.status(200).json({ message: 'Étiquette mise à jour avec succès', updatedGameLabel });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'étiquette de jeu', error });
    }
};

// DELETE game label by ID
exports.deleteGameLabel = async (req, res) => {
    try {
        const deletedGameLabel = await GameLabel.findByIdAndDelete(req.params.id);
        if (!deletedGameLabel) {
            return res.status(404).json({ message: 'Étiquette non trouvée' });
        }
        res.status(200).json({ message: 'Étiquette supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'étiquette de jeu', error });
    }
};
