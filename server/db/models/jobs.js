const Sequelize = require('sequelize')
const db = require('../db')

const Jobs = db.define('jobs', {
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    salary: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    requirements: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    preferred: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})
module.exports = Jobs;
