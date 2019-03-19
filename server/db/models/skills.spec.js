const Sequelize = require('sequelize')
const db = require('../db')
const Skills = db.model('skills')
const factory = require('../../utils/factory')
const { expect } = require('chai')
describe('Skills model', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })
    after(async () => {
        await Skills.destroy({ truncate: true, cascade: true })
    })
    describe('Model properties', () => {

        it('ensures the enum of values for level is adhered to', async () => {
            let cody = factory.SkillsFactory({ skill: 'Javascript', level: 'NotEnum' })
            try {
                await cody.validate()
            } catch (err) {
                expect(err.errors.length).to.equal(1)
                expect(err.errors[0].message).to.equal('Validation isIn on level failed')
            }
        })
    })
})
