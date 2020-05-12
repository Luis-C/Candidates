const express = require('express');
const router = express.Router();
const stalkerController = require('../controllers/stalker.controller');

router.post('/addstalker', stalkerController.registerNewStalker);
router.get('/allstalkers', stalkerController.getAll);

module.exports = router;
