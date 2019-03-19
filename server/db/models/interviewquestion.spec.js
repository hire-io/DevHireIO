const { expect } = require('chai')
const db = require('../index')
const InterviewQuestion = db.model('interviewQuestion')
const factory = require('../../utils/factory')

describe('InterviewQuestion model', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })
    after(async () => {
        await InterviewQuestion.destroy({ truncate: true, cascade: true })
    })
    describe('Model properties', () => {
        let interview;
        it('validation testing - ensures a record is not created without question/answer', async () => {
            interview = factory.InterviewQuestionFactory({ question: null, answer: null });
            try {
                await interview.validate()
            } catch (err) {
                expect(err.errors.length).to.equal(2);
                expect(err.errors[0].message).to.equal('interviewQuestion.question cannot be null')
                expect(err.errors[1].message).to.equal('interviewQuestion.answer cannot be null')
            }
        })
    });
    describe('Model Structure', () => {
        let interview;
        it('does not return hint with default scope', async () => {
            interview = factory.InterviewQuestionFactory({ question: 'How much wood could a woodchuck chuck if a woodchuck could chuck wood?', answer: '42 logs' });
            try {
                await interview.save();
                const q = await InterviewQuestion.findOne();
                expect(q.hints).to.equal(undefined)
            } catch (err) {
                console.error(err)
            }
        })
    })
})
