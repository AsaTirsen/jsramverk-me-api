const dotenv = require('dotenv');
const envVars = dotenv.config();

if (envVars) {
    module.exports = {
        secret: process.env.JWT_SECRET,
        port: process.env.PORT
    };
    console.log(envVars);
} else {
    module.exports = {
        secret: "min_hemlis",
        port: 1337
    }
    console.log(secret)
}
