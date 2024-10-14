const Invoice = require('../Models/Invoice');

exports.getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('sale_id').populate('buyer_id');
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createInvoice = async (req, res) => {
    try {
        const invoice = new Invoice(req.body);
        const savedInvoice = await invoice.save();
        res.status(201).json(savedInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('sale_id').populate('buyer_id');
        if (!invoice) return res.status(404).json({ message: "Invoice not found" });
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateInvoice = async (req, res) => {
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteInvoice = async (req, res) => {
    try {
        await Invoice.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getInvoicesByBuyer = async (req, res) => {
    try {
        const invoices = await Invoice.find({ buyer_id: req.params.buyer_id }).populate('sale_id');
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
