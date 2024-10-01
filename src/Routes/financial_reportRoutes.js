const express = require('express');
const router = express.Router();
const financialReportController = require('../Controllers/financial_reportController');

// Route pour obtenir tous les rapports financiers
router.get('/financial_reports', financialReportController.getAllFinancialReports);

// Route pour obtenir un rapport financier par ID
router.get('/financial_reports/:id', financialReportController.getFinancialReportById);

// Route pour créer un nouveau rapport financier
router.post('/financial_reports', financialReportController.createFinancialReport);

// Route pour mettre à jour un rapport financier existant
router.put('/financial_reports/:id', financialReportController.updateFinancialReport);

// Route pour supprimer un rapport financier
router.delete('/financial_reports/:id', financialReportController.deleteFinancialReport);

module.exports = router;
