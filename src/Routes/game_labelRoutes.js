const express = require('express');
const router = express.Router();
const gameLabelController = require('../Controllers/game_labelController');

// Route pour obtenir toutes les étiquettes de jeux
router.get('/game_labels', gameLabelController.getAllGameLabels);

// Route pour obtenir une étiquette de jeu par ID
router.get('/game_labels/:id', gameLabelController.getGameLabelById);

// Route pour créer une nouvelle étiquette de jeu
router.post('/game_labels', gameLabelController.createGameLabel);

// Route pour mettre à jour une étiquette de jeu existante
router.put('/game_labels/:id', gameLabelController.updateGameLabel);

// Route pour supprimer une étiquette de jeu
router.delete('/game_labels/:id', gameLabelController.deleteGameLabel);

module.exports = router;
