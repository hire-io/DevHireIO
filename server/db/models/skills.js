const Sequelize = require('sequelize')
const db = require('../db')

const Skills = db.define('skills', {
    skill: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isAlpha: true
        }
    },
    level: {
        type: Sequelize.STRING,
        validate: {
            isIn: [['Learning', 'Functional', 'Proficient']]
        }
    }
})

module.exports = Skills;
