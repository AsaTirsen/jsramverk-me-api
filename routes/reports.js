var express = require('express');
var router = express.Router();
const texts = require('../models/texts');
const jwt = require('jsonwebtoken');


router.get('/week/1', function (req, res) {
    texts.getReport(res, '1');
});

router.get('/week/2', function (req, res) {
    texts.getReport(res, "2");
});

router.get('/week/3', function (req, res) {
    texts.getReport(res, "3");
});

router.get('/week/4', function (req, res) {
    texts.getReport(res, "4");
});

router.get('/week/5', function (req, res) {
    texts.getReport(res, "5");
});

router.get('/week/6', function (req, res) {
    texts.getReport(res, "6");
});

router.get('/week/10', function (req, res) {
    texts.getReport(res, "10");
});

router.get('/', function (req, res) {
    texts.getTexts(res, req.body);
});

router.post("/",
    (req, res, next) => checkToken(req, res, next),
    (req, res) =>  texts.addText(res, req.body));

router.put("/",
    (req, res, next) => checkToken(req, res, next),
    (req, res) =>  texts.updateText(res, req.body));

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function(err) {
        if (err) {
            console.log("Token not verified");
        }
        console.log("Token verified");

        next();
    });
}
module.exports = router;
