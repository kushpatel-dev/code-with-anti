const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

router.get('/', moduleController.getModules);
router.post('/', moduleController.createModule);

module.exports = router;
