const express = require('express');
const router = express.Router();
const invoiceController = require('../Controllers/invoiceController');

// Route pour obtenir toutes les étiquettes de jeux
router.get('/invoices', invoiceController.getAllInvoices);

// Route pour obtenir une étiquette de jeu par ID
router.get('/invoices/:id', invoiceController.getInvoiceById);

// Route pour créer une nouvelle étiquette de jeu
router.post('/invoices', invoiceController.createInvoice);

// Route pour mettre à jour une étiquette de jeu existante
router.put('/invoices/:id', invoiceController.updateInvoice);

// Route pour supprimer une étiquette de jeu
router.delete('/invoices/:id', invoiceController.deleteInvoice);

module.exports = router;
