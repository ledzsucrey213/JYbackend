const Transaction = require('../Models/transaction');

// GET all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('seller_id'); // Récupère les détails du vendeur
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// GET transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate('seller_id');
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction non trouvée' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// POST create a new transaction
exports.createTransaction = async (req, res) => {
    try {
        const { seller_id, amount, type, date } = req.body;

        const newTransaction = new Transaction({
            seller_id,
            amount,
            type,
            date,
        });

        await newTransaction.save();
        res.status(201).json({ message: 'Transaction créée avec succès', newTransaction });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la transaction', error });
    }
};

// PUT update an existing transaction
exports.updateTransaction = async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('seller_id');
        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction non trouvée' });
        }
        res.status(200).json({ message: 'Transaction mise à jour avec succès', updatedTransaction });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la transaction', error });
    }
};

// DELETE transaction by ID
exports.deleteTransaction = async (req, res) => {
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction non trouvée' });
        }
        res.status(200).json({ message: 'Transaction supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la transaction', error });
    }
};
