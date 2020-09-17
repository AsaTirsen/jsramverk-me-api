const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');
const bcrypt = require('bcryptjs');


const addUser = {
    addUser: function (res, body) {
        const email = body.email;
        const password = body.password;
        const saltRounds = 10;


        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/register/",
                    title: "Email or password missing",
                    detail: "Email or password missing in request"
                }
            });
        }

        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/register",
                        title: "bcrypt error",
                        detail: "bcrypt error"
                    }
                });
            }

        db.run("INSERT INTO users (email, password) VALUES (?, ?)",
            email,
            hash, (err) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/register",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                return res.status(201).json({
                    data: {
                        message: "User successfully registered."
                    }
                });
            });
    })
    },
}


module.exports = addUser;
