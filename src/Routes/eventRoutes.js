const express = require('express');
const router = express.Router();
const eventController = require('../Controllers/eventController');

router.get('/', eventController.getEvents);
router.post('/', eventController.createEvent);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);
router.get('/isActive', eventController.getActiveEvent);

module.exports = router;
