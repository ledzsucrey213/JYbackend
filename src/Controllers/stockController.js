const Stock = require('../Models/stock');

// GET all stocks
exports.getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.find().populate('game_id seller_id'); // Récupérer les détails du jeu et du vendeur
        res.status(200).json(stocks);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// GET stock by ID
exports.getStockById = async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id).populate('game_id seller_id');
        if (!stock) {
            return res.status(404).json({ message: 'Stock non trouvé' });
        }
        res.status(200).json(stock);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// POST create a new stock entry
exports.createStock = async (req, res) => {
    try {
        const { game_id, seller_id, quantity_sold, stock_quantity } = req.body;

        const newStock = new Stock({
            game_id,
            seller_id,
            quantity_sold,
            stock_quantity,
        });

        await newStock.save();
        res.status(201).json({ message: 'Stock créé avec succès', newStock });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du stock', error });
    }
};

// PUT update an existing stock
exports.updateStock = async (req, res) => {
    try {
        const updatedStock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('game_id seller_id');
        if (!updatedStock) {
            return res.status(404).json({ message: 'Stock non trouvé' });
        }
        res.status(200).json({ message: 'Stock mis à jour avec succès', updatedStock });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du stock', error });
    }
};

// DELETE stock by ID
exports.deleteStock = async (req, res) => {
    try {
        const deletedStock = await Stock.findByIdAndDelete(req.params.id);
        if (!deletedStock) {
            return res.status(404).json({ message: 'Stock non trouvé' });
        }
        res.status(200).json({ message: 'Stock supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du stock', error });
    }
};
