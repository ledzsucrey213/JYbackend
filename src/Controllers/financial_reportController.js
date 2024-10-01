const FinancialReport = require('../Models/financial_report');

// GET all financial reports
exports.getAllFinancialReports = async (req, res) => {
    try {
        const reports = await FinancialReport.find().populate('seller_id'); // Récupérer les détails du vendeur
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// GET financial report by ID
exports.getFinancialReportById = async (req, res) => {
    try {
        const report = await FinancialReport.findById(req.params.id).populate('seller_id');
        if (!report) {
            return res.status(404).json({ message: 'Rapport financier non trouvé' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// POST create a new financial report
exports.createFinancialReport = async (req, res) => {
    try {
        const { seller_id, total_sales, total_deposits, total_commission, balance_due } = req.body;

        const newReport = new FinancialReport({
            seller_id,
            total_sales,
            total_deposits,
            total_commission,
            balance_due,
        });

        await newReport.save();
        res.status(201).json({ message: 'Rapport financier créé avec succès', newReport });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du rapport financier', error });
    }
};

// PUT update an existing financial report
exports.updateFinancialReport = async (req, res) => {
    try {
        const updatedReport = await FinancialReport.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('seller_id');
        if (!updatedReport) {
            return res.status(404).json({ message: 'Rapport financier non trouvé' });
        }
        res.status(200).json({ message: 'Rapport financier mis à jour avec succès', updatedReport });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du rapport financier', error });
    }
};

// DELETE financial report by ID
exports.deleteFinancialReport = async (req, res) => {
    try {
        const deletedReport = await FinancialReport.findByIdAndDelete(req.params.id);
        if (!deletedReport) {
            return res.status(404).json({ message: 'Rapport financier non trouvé' });
        }
        res.status(200).json({ message: 'Rapport financier supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du rapport financier', error });
    }
};
