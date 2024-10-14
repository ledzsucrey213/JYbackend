const Sale = require('../Models/Sale');

exports.getSales = async (req, res) => {
    try {
        const sales = await Sale.find().populate('games_id').populate('buyer_id');
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createSale = async (req, res) => {
    try {
        const sale = new Sale(req.body);
        const savedSale = await sale.save();
        res.status(201).json(savedSale);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id).populate('games_id').populate('buyer_id');
        if (!sale) return res.status(404).json({ message: "Sale not found" });
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSale = async (req, res) => {
    try {
        const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedSale);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSale = async (req, res) => {
    try {
        await Sale.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
