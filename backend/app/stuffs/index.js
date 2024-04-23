const express = require('express');

const stuffsController = require('./controller');

const router = express.Router();

router.post('/stuffs', stuffsController.createStuff);

router.put('/stuff/:_id', stuffsController.updateStuff);

router.delete('/stuff/:_id', stuffsController.deleteStuff);

module.exports = router; 