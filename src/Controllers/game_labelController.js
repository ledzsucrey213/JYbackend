const GameLabel = require('../Models/game_label');

exports.getGameLabels = async (req, res) => {
    try {
        const gameLabels = await GameLabel.find();
        res.status(200).json(gameLabels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createGameLabel = async (req, res) => {
    try {
        const gameLabel = new GameLabel(req.body);
        const savedGameLabel = await gameLabel.save();
        res.status(201).json(savedGameLabel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getGameLabelById = async (req, res) => {
    try {
        const gameLabel = await GameLabel.findById(req.params.id);
        if (!gameLabel) return res.status(404).json({ message: "Game Label not found" });
        res.status(200).json(gameLabel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateGameLabel = async (req, res) => {
    try {
        const updatedGameLabel = await GameLabel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedGameLabel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteGameLabel = async (req, res) => {
    try {
        await GameLabel.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGameLabelsBySeller = async (req, res) => {
    try {
        const gameLabels = await GameLabel.find({ seller_id: req.params.seller_id });
        res.status(200).json(gameLabels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGameLabelsBySellerNotOnSale = async (req, res) => {
    try {
        const gameLabels = await GameLabel.find({ seller_id: req.params.seller_id, is_On_Sale: false });
        res.status(200).json(gameLabels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer les GameLabels par l'ID du jeu
exports.getGameLabelsByGameId = async (req, res) => {
    try {
        // Recherche des GameLabels où l'ID du jeu correspond à celui fourni
        const gameLabels = await GameLabel.find({ game_id: req.params.game_id });
        
        // Si aucun GameLabel n'est trouvé, retourner une réponse 404
        if (gameLabels.length === 0) {
            return res.status(404).json({ message: "No Game Labels found for this Game ID" });
        }

        // Sinon, renvoyer les GameLabels trouvés
        res.status(200).json(gameLabels);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse 500 avec le message d'erreur
        res.status(500).json({ message: error.message });
    }
};

exports.createGameLabels = async (req, res) => {
    try {
        const gameLabels = req.body; // Assurez-vous que req.body contient un tableau
        if (!Array.isArray(gameLabels)) {
            return res.status(400).json({ message: "Request body must be an array of GameLabels" });
        }

        // Utilisez `insertMany` pour insérer plusieurs documents d'un coup
        const savedGameLabels = await GameLabel.insertMany(gameLabels);
        res.status(201).json(savedGameLabels);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




