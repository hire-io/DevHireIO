const Sequelize = require('sequelize')
const db = require('../db')

const WorkExperience = db.define('workExperience', {
    companyName: {
        type: Sequelize.STRING
    },
    jobTitle: {
        type: Sequelize.STRING
    },
    startDate: {
        type: Sequelize.DATEONLY
    },
    endDate: {
        type: Sequelize.DATEONLY
    },
    description: {
        type: Sequelize.TEXT
    }
})
module.exports = WorkExperience
