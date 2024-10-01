const Event = require('../Models/event');

// GET all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// GET event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// POST create a new event
exports.createEvent = async (req, res) => {
    try {
        const { name, start, end, is_active } = req.body;

        const newEvent = new Event({
            name,
            start,
            end,
            is_active,
        });

        await newEvent.save();
        res.status(201).json({ message: 'Événement créé avec succès', newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'événement', error });
    }
};

// PUT update an existing event
exports.updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        res.status(200).json({ message: 'Événement mis à jour avec succès', updatedEvent });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'événement', error });
    }
};

// DELETE event by ID
exports.deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        res.status(200).json({ message: 'Événement supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'événement', error });
    }
};
