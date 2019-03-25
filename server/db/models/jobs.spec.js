const { expect } = require('chai')
const db = require('../index')
const Jobs = db.model('jobs')
const factory = require('../../utils/factory')

describe('Jobs mdoel', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })
    after(async () => {
        await Jobs.destroy({ truncate: true, cascade: true })
    })
    describe('Model properties', () => {
        let job;
        it('validation testing - ensures the model will not be created without the required values', async () => {
            job = factory.JobFactory({ description: null, salary: null, requirements: null, preferred: null, location: null });
            try {
                await job.validate()
            } catch (err) {
                expect(err.errors.length).to.equal(5);
                expect(err.errors[0].message).to.equal('jobs.description cannot be null')
                expect(err.errors[1].message).to.equal('jobs.salary cannot be null')
                expect(err.errors[2].message).to.equal('jobs.requirements cannot be null')
                expect(err.errors[3].message).to.equal('jobs.preferred cannot be null')
                expect(err.errors[4].message).to.equal('jobs.location cannot be null')
            }
        })
    })
})
