const Sequelize = require("sequelize");
const db = require('../config/DBConfig');

const User = db.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    verification: {
        type: Sequelize.INTEGER
    }

});

module.exports = User