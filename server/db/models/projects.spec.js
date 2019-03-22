const Sequelize = require('sequelize')
const db = require('../db')
const Projects = db.model('projects')
const factory = require('../../utils/factory')
const { expect } = require('chai')

describe('Projects model', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })
    after(async () => {
        await Projects.destroy({ truncate: true, cascade: true })
    })
    describe('Model properties', () => {
        let project = factory.ProjectsFactory();
        it('creates a model successfully', async () => {
            const created = await project.validate();
            expect(created).to.not.equal(undefined)
        })
    })
})
