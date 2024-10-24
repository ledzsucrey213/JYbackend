const Game = require('../Models/game');

exports.getGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createGame = async (req, res) => {
    try {
        const game = new Game(req.body);
        const savedGame = await game.save();
        res.status(201).json(savedGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: "Game not found" });
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateGame = async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteGame = async (req, res) => {
    try {
        await Game.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
