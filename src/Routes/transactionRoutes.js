const express = require('express');
const router = express.Router();
const transactionController = require('../Controllers/transactionController');

// Route pour obtenir toutes les transactions
router.get('/transactions', transactionController.getAllTransactions);

// Route pour obtenir une transaction par ID
router.get('/transactions/:id', transactionController.getTransactionById);

// Route pour créer une nouvelle transaction
router.post('/transactions', transactionController.createTransaction);

// Route pour mettre à jour une transaction existante
router.put('/transactions/:id', transactionController.updateTransaction);

// Route pour supprimer une transaction
router.delete('/transactions/:id', transactionController.deleteTransaction);

module.exports = router;
