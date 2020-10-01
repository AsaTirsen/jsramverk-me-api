const express = require('express');
const router = express.Router();
const texts = require('../models/texts')

router.get('/', function (req, res, next) {
    texts.getText(res, "Lite om mig");
});

router.post('/', function (req, res) {
    texts.addText(res, req.body);
});

module.exports = router;
