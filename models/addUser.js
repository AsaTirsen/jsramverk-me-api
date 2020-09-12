const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');
//
// db.run("INSERT INTO users (email, password) VALUES (?, ?)",
//     "user@example.com",
//     "superlonghashedpasswordthatwewillseehowtohashinthenextsection", (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("works");
//         }
//     });

// db.run("INSERT INTO test (testColumn) VALUES(?)",
//     'test is done', (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("test works")
//     }
// });
const test = {
    getAllOrders: function (
        res,
        status = 200,
    ) {
        let sql = `SELECT * FROM test`;

        db.all(
            sql,
            function (err, rows) {
                if (err) {
                    res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/orders",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                res.status(status).json({data: rows})
            });
    },
}

module.exports = test;
// db.get(sql, (err, row) => {
//     if (err) {
//         throw err;
//     } else {
//         console.log(row);
//     }
// });

// db.each(sql, (err, row) => {
//     if (err) {
//         throw err;
//     } else {
//         console.log(row);
//     }
// });
