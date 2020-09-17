const express = require('express');
const router = express.Router();
const register = require('../models/addUser')


router.post('/', function (req, res) {
    register.addUser(res, req.body);
});

module.exports = router;
