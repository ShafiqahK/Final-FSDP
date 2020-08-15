const Sequelize = require("sequelize");
const db = require('../config/DBConfig');

const CommComments = db.define('CommComments',{
    questionID:{
        type: Sequelize.INTEGER
    },
    comment:{
        type: Sequelize.STRING
    },
    date:{
        type: Sequelize.DATE
    }
})

module.exports = CommComments;