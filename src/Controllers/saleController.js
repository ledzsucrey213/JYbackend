const Sale = require('../Models/sale');

// GET all sales
exports.getAllSales = async (req, res) => {
    try {
        const sales = await Sale.find().populate('game_id user_id'); // Récupérer les détails du jeu et de l'utilisateur
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// GET sale by ID
exports.getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id).populate('game_id user_id');
        if (!sale) {
            return res.status(404).json({ message: 'Vente non trouvée' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// POST create a new sale
exports.createSale = async (req, res) => {
    try {
        const { game_id, user_id, sale_price, quantity_sold, commission } = req.body;

        const newSale = new Sale({
            game_id,
            user_id,
            sale_price,
            quantity_sold,
            commission,
        });

        await newSale.save();
        res.status(201).json({ message: 'Vente créée avec succès', newSale });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la vente', error });
    }
};

// PUT update an existing sale
exports.updateSale = async (req, res) => {
    try {
        const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('game_id user_id');
        if (!updatedSale) {
            return res.status(404).json({ message: 'Vente non trouvée' });
        }
        res.status(200).json({ message: 'Vente mise à jour avec succès', updatedSale });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la vente', error });
    }
};

// DELETE sale by ID
exports.deleteSale = async (req, res) => {
    try {
        const deletedSale = await Sale.findByIdAndDelete(req.params.id);
        if (!deletedSale) {
            return res.status(404).json({ message: 'Vente non trouvée' });
        }
        res.status(200).json({ message: 'Vente supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la vente', error });
    }
};
