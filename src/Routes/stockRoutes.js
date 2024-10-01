const express = require('express');
const router = express.Router();
const stockController = require('../Controllers/stockController');

// Route pour obtenir tous les stocks
router.get('/stocks', stockController.getAllStocks);

// Route pour obtenir un stock par ID
router.get('/stocks/:id', stockController.getStockById);

// Route pour créer un nouveau stock
router.post('/stocks', stockController.createStock);

// Route pour mettre à jour un stock existant
router.put('/stocks/:id', stockController.updateStock);

// Route pour supprimer un stock
router.delete('/stocks/:id', stockController.deleteStock);

module.exports = router;
