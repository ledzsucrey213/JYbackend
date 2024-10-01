const express = require('express');
const router = express.Router();
const saleController = require('../Controllers/saleController');

// Route pour obtenir toutes les ventes
router.get('/sales', saleController.getAllSales);

// Route pour obtenir une vente par ID
router.get('/sales/:id', saleController.getSaleById);

// Route pour créer une nouvelle vente
router.post('/sales', saleController.createSale);

// Route pour mettre à jour une vente existante
router.put('/sales/:id', saleController.updateSale);

// Route pour supprimer une vente
router.delete('/sales/:id', saleController.deleteSale);

module.exports = router;
