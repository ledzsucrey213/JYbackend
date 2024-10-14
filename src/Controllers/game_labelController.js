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
