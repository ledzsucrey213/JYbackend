const express = require('express');
const router = express.Router();
const invoiceController = require('../Controllers/invoiceController');

router.get('/', invoiceController.getInvoices);
router.post('/', invoiceController.createInvoice);
router.get('/:id', invoiceController.getInvoiceById);
router.put('/:id', invoiceController.updateInvoice);
router.delete('/:id', invoiceController.deleteInvoice);
router.get('/buyer/:buyer_id', invoiceController.getInvoicesByBuyer);

module.exports = router;
