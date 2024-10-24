const express = require('express');
const router = express.Router();
const gameLabelController = require('../Controllers/game_labelController');

router.get('/', gameLabelController.getGameLabels);
router.post('/', gameLabelController.createGameLabel);
router.get('/:id', gameLabelController.getGameLabelById);
router.put('/:id', gameLabelController.updateGameLabel);
router.delete('/:id', gameLabelController.deleteGameLabel);
router.get('/seller/:seller_id', gameLabelController.getGameLabelsBySeller);
router.get('/seller/:seller_id/is_On_Sale=false', gameLabelController.getGameLabelsBySellerNotOnSale);

module.exports = router;
