const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

const texts = {
    addText: function (res, body) {
        db.run("INSERT INTO texts (title, markdown) VALUES (?, ?)",
            body.title,
            body.markdown,
            function (err) {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "POST /order",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }
         });
    },
    getTexts:function(res) {
        let sql = `SELECT * FROM texts`;
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

                res.status(200).json({data: rows})
            });
    },
    getText:function(res, title) {
        let sql = `SELECT * FROM texts WHERE title = ?`;
        db.all(
            sql,
            function (err, rows, title) {
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

                res.status(200).json({data: rows})
            });
    },
};

module.exports = texts;
