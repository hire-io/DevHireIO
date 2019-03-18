/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  after(async () => {
    await User.destroy({truncate: true, cascade: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: 'cody@puppybook.com',
        password: 'bones',
        firstName: 'Cody',
        lastName: 'Codyson',
        location: 'Timbuktu, Kansas',
        position: 'Software Developer',
        minSalary: '20000.00',
        maxSalary: '30000.00',
        description: 'I am a software developer that wants a job please',
        photoDescription: 'www.google.com/photos/cody/photoofcody',
        videoDescription: 'www.firebaselinktocodyvideo.com/cody',
        userLevel: 'Employee'
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
