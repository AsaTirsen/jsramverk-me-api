var express = require('express');
var router = express.Router();
const texts = require('../models/texts')

router.get('/', function(req, res, next) {
    texts.getText(res, "Lite om mig");
});

module.exports = router;
// router.get('/', (req, res) => orders.getAllOrders(res, req.query.api_key));

// getAllProducts: function(res, apiKey, status=200) {
//     db.all("SELECT " + products.dataFields + " FROM products WHERE apiKey = ?",
//         apiKey, (err, rows) => {
//             if (err) {
//                 return products.errorResponse(res, "/products", err);
//             }
//
//             res.status(status).json( { data: rows } );
//         });
// },
