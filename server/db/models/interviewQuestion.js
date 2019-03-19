const Sequelize = require('sequelize')
const db = require('../db')

const InterviewQuestion = db.define('interviewQuestion', {
    question: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    hints: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true
    },
    answer: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

InterviewQuestion.addScope('withHints', { attributes: ['question', 'hints', 'answer'] });
InterviewQuestion.addScope('defaultScope', { attributes: ['question', 'answer'] }, { override: true });

module.exports = InterviewQuestion
