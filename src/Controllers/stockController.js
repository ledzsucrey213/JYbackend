const Stock = require('../Models/stock');

exports.getStocks = async (req, res) => {
    try {
        const stocks = await Stock.find().populate('games_id').populate('games_sold').populate('seller_id');
        res.status(200).json(stocks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createStock = async (req, res) => {
    try {
        const stock = new Stock(req.body);
        const savedStock = await stock.save();
        res.status(201).json(savedStock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getStockById = async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id).populate('games_id').populate('games_sold').populate('seller_id');
        if (!stock) return res.status(404).json({ message: "Stock not found" });
        res.status(200).json(stock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStock = async (req, res) => {
    try {
        const updatedStock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedStock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteStock = async (req, res) => {
    try {
        await Stock.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStockBySeller = async (req, res) => {
    try {
      const { sellerId } = req.params;
      const stock = await Stock.findOne({ seller_id: sellerId }).populate('games_id').populate('games_sold').populate('seller_id');
      if (!stock) {
        return res.status(404).json({ message: 'Stock not found' });
      }
      res.json(stock);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
