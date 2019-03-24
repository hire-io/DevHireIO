const { expect } = require('chai')
const db = require('../index')
const Education = db.model('education')
const factory = require('../../utils/factory')

describe('Model properties', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })
    after(async () => {
        await Education.destroy({ truncate: true, cascade: true })
    })
    describe('model properties', () => {
        it('ensures all values are required', async () => {
            try {
                await factory.EducationFactory({ schoolName: null, startDate: null, endDate: null, degree: null }).validate()
            } catch (err) {
                expect(err.errors.length).to.equal(4)
                expect(err.errors[0].message).to.equal('education.schoolName cannot be null')
                expect(err.errors[1].message).to.equal('education.startDate cannot be null')
                expect(err.errors[2].message).to.equal('education.endDate cannot be null')
                expect(err.errors[3].message).to.equal('education.degree cannot be null')
            }
        })
    })
})
