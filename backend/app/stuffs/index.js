const express = require('express');

const stuffsController = require('./controller');

const router = express.Router();

router.post('/stuffs', stuffsController.createstuff);

router.put('/stuff/:_id', stuffsController.updatestuff);

router.delete('/stuff/:_id', stuffsController.deletestuff);

module.exports = router; 