const express = require('express');
const router = express.Router();
const reportController = require('../Controllers/financial_reportController');

router.get('/', reportController.getReports);
router.post('/', reportController.createReport);
router.get('/:id', reportController.getReportById);
router.put('/:id', reportController.updateReport);
router.delete('/:id', reportController.deleteReport);
router.get('/event/:event_id', reportController.getReportsByEvent);
router.get('/reports/event/:event_id/seller/:seller_id', reportController.getReportsByEventBySeller);

module.exports = router;
