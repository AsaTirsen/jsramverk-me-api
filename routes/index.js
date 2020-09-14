var express = require('express');
var router = express.Router();
const texts = require('../models/texts')


router.get('/', function (req, res, next) {
    texts.getText(res, "Lite om mig");
});

router.post('/', function (req, res) {
    texts.addText(res, req.body);
});

router.get('/reports/week/1', function (req, res, next) {
    texts.getText(res, "Redovisning vecka 1");
});

router.get('/reports/week/2', function (req, res, next) {
    texts.getText(res, "Redovisning vecka 2");
});

router.post("/reports", function (req, res) {
    texts.addText(res, req.body);
});

module.exports = router;
