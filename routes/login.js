const express = require('express');
const router = express.Router();
const login = require('../models/login')


router.post('/', function (req, res) {
    login.checkLogin(res, req.body);
});

module.exports = router;
