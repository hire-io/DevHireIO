const Sequelize = require('sequelize')
const db = require('../db')

const Schedule = db.define('schedule', {
    startTime: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    endTime: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [['Available', 'Paired', 'Interview Proposed', 'Paired']]
        }
    }
})

module.exports = Schedule
