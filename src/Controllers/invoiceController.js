const Invoice = require('../Models/invoice'); // Assurez-vous que le chemin du modèle est correct

// GET all invoices
exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find()
            .populate('sale_id buyer_id'); // Récupère les détails de la vente et de l'acheteur
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// GET invoice by ID
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id)
            .populate('sale_id buyer_id');
        if (!invoice) {
            return res.status(404).json({ message: 'Facture non trouvée' });
        }
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// POST create a new invoice
exports.createInvoice = async (req, res) => {
    try {
        const { sale_id, buyer_id, amount } = req.body; // Assurez-vous que 'amount' est inclus

        const newInvoice = new Invoice({
            sale_id,
            buyer_id,
            amount, // Ajout du champ amount
        });

        await newInvoice.save();
        res.status(201).json({ message: 'Facture créée avec succès', newInvoice });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la facture', error });
    }
};

// PUT update an existing invoice
exports.updateInvoice = async (req, res) => {
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('sale_id buyer_id');
        if (!updatedInvoice) {
            return res.status(404).json({ message: 'Facture non trouvée' });
        }
        res.status(200).json({ message: 'Facture mise à jour avec succès', updatedInvoice });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la facture', error });
    }
};

// DELETE invoice by ID
exports.deleteInvoice = async (req, res) => {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!deletedInvoice) {
            return res.status(404).json({ message: 'Facture non trouvée' });
        }
        res.status(200).json({ message: 'Facture supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la facture', error });
    }
};
