const express = require('express');
const router = express.Router();
const eventController = require('../Controllers/eventController');

// Route pour obtenir tous les événements
router.get('/events', eventController.getAllEvents);

// Route pour obtenir un événement par ID
router.get('/events/:id', eventController.getEventById);

// Route pour créer un nouvel événement
router.post('/events', eventController.createEvent);

// Route pour mettre à jour un événement existant
router.put('/events/:id', eventController.updateEvent);

// Route pour supprimer un événement
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;
