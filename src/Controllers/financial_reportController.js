const Report = require('../Models/financial_report');

exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find().populate('seller_id').populate('event_id').populate('stock_id');
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createReport = async (req, res) => {
    try {
        const report = new Report(req.body);
        const savedReport = await report.save();
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id).populate('seller_id').populate('event_id').populate('stock_id');
        if (!report) return res.status(404).json({ message: "Report not found" });
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateReport = async (req, res) => {
    try {
        const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteReport = async (req, res) => {
    try {
        await Report.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReportsByEvent = async (req, res) => {
    try {
        const reports = await Report.find({ event_id: req.params.event_id }).populate('seller_id').populate('stock_id');
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReportsByEventBySeller = async (req, res) => {
    try {
        const reports = await Report.find({ 
            event_id: req.params.event_id, 
            seller_id: req.params.seller_id 
        }).populate('seller_id').populate('stock_id');
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
