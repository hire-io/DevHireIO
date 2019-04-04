const Sequelize = require('sequelize')
const db = require('../db')
const Schedule = db.model('schedule')
const factory = require('../../utils/factory')
const { expect } = require('chai')

describe('Schedule model', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })
    after(async () => {
        await Schedule.destroy({ truncate: true, cascade: true })
    })
    describe('Model properties', () => {
        let schedule = factory.ScheduleFactory();
        it('creates a model successfully', async () => {
            const created = await schedule.validate();
            expect(created).to.not.equal(undefined)
        })
        it('ensures the enum of values for status is adhered to', async () => {
            let sched = factory.ScheduleFactory({ status: 'Invalid Status' })
            try {
                await sched.validate()
            } catch (err) {
                expect(err.errors.length).to.equal(1)
                expect(err.errors[0].message).to.equal('Validation isIn on status failed')
            }
        })
    })
})
