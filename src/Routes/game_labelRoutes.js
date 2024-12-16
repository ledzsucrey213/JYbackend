const express = require('express');
const router = express.Router();
const gameLabelController = require('../Controllers/game_labelController');

router.get('/', gameLabelController.getGameLabels);
router.post('/', gameLabelController.createGameLabel);
router.post('/deposit/', gameLabelController.createGameLabels);
router.get('/:id', gameLabelController.getGameLabelById);
router.put('/:id', gameLabelController.updateGameLabel);
router.delete('/:id', gameLabelController.deleteGameLabel);
router.get('/seller/:seller_id', gameLabelController.getGameLabelsBySeller);
router.get('/seller/:seller_id/is_On_Sale=false', gameLabelController.getGameLabelsBySellerNotOnSale);
router.get('/game/:game_id', gameLabelController.getGameLabelsByGameId);
router.get('/not-reclaimed/:event_id', gameLabelController.getNotReclaimedGames);


module.exports = router;
