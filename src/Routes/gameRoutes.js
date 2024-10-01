const express = require('express');
const router = express.Router();
const gameController = require('../Controllers/gameController');

// Route pour obtenir tous les jeux
router.get('/games', gameController.getAllGames);

// Route pour obtenir un jeu par ID
router.get('/games/:id', gameController.getGameById);

// Route pour créer un nouveau jeu
router.post('/games', gameController.createGame);

// Route pour mettre à jour un jeu existant
router.put('/games/:id', gameController.updateGame);

// Route pour supprimer un jeu
router.delete('/games/:id', gameController.deleteGame);

module.exports = router;
