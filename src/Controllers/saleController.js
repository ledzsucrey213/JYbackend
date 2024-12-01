const Sale = require('../Models/sale');

exports.getSales = async (req, res) => {
    try {
        // Suppression du populate sur buyer_id puisqu'il n'existe plus
        const sales = await Sale.find().populate('games_id');
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
        // Suppression du populate sur buyer_id puisqu'il n'existe plus
        const sale = await Sale.findById(req.params.id).populate('games_id');
        if (!sale) return res.status(404).json({ message: "Sale not found" });
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSale = async (req, res) => {
    try {
        const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSale) return res.status(404).json({ message: "Sale not found" });
        res.status(200).json(updatedSale);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSale = async (req, res) => {
    try {
        const deletedSale = await Sale.findByIdAndDelete(req.params.id);
        if (!deletedSale) return res.status(404).json({ message: "Sale not found" });
        res.status(204).json(); // Réponse sans contenu pour une suppression réussie
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
