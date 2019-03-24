const Sequelize = require('sequelize')
const db = require('../db')

const Education = db.define('education', {
    schoolName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    endDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    degree: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})
module.exports = Education
