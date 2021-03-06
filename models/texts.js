//const sqlite3 = require('sqlite3').verbose();
const db = require("../db/database.js");

const texts = {
    addText: function (res, body) {
        db.run("INSERT INTO texts (title, longtext, week) VALUES (?, ?, ?)",
            body.title,
            body.text,
            body.week,
            function (err) {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "POST /texts",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }
                res.json({data: []});
            });
    },
    getTexts: function(res) {
        let sql = `SELECT * FROM texts`;

        db.all(
            sql,
            function (err, rows) {
                if (err) {
                    res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/texts",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                res.json({data: rows});
            });
    },
    getText: function (res, title) {
        let sql = `SELECT * FROM texts WHERE title = ?`;

        db.all(
            sql, title,
            function (err, rows) {
                if (err) {
                    res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/texts",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }
                res.json({ data: rows });
            });
    },
    getReport: function (res, week) {
        let sql = `SELECT * FROM texts WHERE week = ?`;

        db.all(
            sql, week,
            function (err, rows) {
                if (err) {
                    res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/texts",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }
                res.json({ data: rows });
            });
    },
    updateText: function (res, body) {
        console.log(body);
        db.run(`UPDATE texts
                SET title = ?,
                    week = ?,
                    longtext = ?
                WHERE
                    id =  ?;`,
        body.title,
        body.week,
        body.longtext,
        body.id,
        function (err) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "POST /texts",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }
            res.json({data: []});
        });
    },
    // deleteText:function(res, id) {
    //     let sql = `DELETE * FROM texts WHERE id = ?`;
    //     db.all(
    //         sql, id,
    //         function (err, rows) {
    //             if (err) {
    //                 res.status(500).json({
    //                     errors: {
    //                         status: 500,
    //                         source: "/texts",
    //                         title: "Database error",
    //                         detail: err.message
    //                     }
    //                 });
    //             }
    //         });
    // },
};

module.exports = texts;
