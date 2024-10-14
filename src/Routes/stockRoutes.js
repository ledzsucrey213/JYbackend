const express = require('express');
const router = express.Router();
const stockController = require('../Controllers/stockController');

router.get('/', stockController.getStocks);
router.post('/', stockController.createStock);
router.get('/:id', stockController.getStockById);
router.put('/:id', stockController.updateStock);
router.delete('/:id', stockController.deleteStock);
router.get('/seller/:seller_id', stockController.getStocksBySeller);

module.exports = router;
