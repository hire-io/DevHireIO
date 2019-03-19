/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const User = db.model('user')
const factory = require('../../utils/factory')
describe('User model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })
  after(async () => {
    await User.destroy({ truncate: true, cascade: true })
  })

  describe('Model Properties', () => {
    let cody, other, third;
    beforeEach(() => {
      cody = factory.UserFactory({
        email: null,
        city: null,
        state: null,
        minSalary: null,
        maxSalary: null,
        userLevel: null
      });
      other = factory.UserFactory({
        state: 'ALA'
      })
      third = factory.UserFactory({
        email: 'somethingnotanemailcom'
      })
    })
    it('validation testing - ensures required properties are present upon creation', async () => {
      try {
        await cody.validate()
      } catch (err) {
        expect(err.errors.length).to.equal(6)
        expect(err.errors[0].message).to.equal('user.email cannot be null')
        expect(err.errors[1].message).to.equal('user.city cannot be null')
        expect(err.errors[2].message).to.equal('user.state cannot be null')
        expect(err.errors[3].message).to.equal('user.minSalary cannot be null')
        expect(err.errors[4].message).to.equal('user.maxSalary cannot be null')
        expect(err.errors[5].message).to.equal('user.userLevel cannot be null')
      }
    }) // end it block
    it('validation testing - ensures state value is length 2', async () => {
      try {
        await other.validate()
      } catch (err) {
        expect(err.errors.length).to.equal(1)
        expect(err.errors[0].message).to.equal('Validation len on state failed')
      }
    })
    it('validation testing - ensures email is email type', async () => {
      try {
        await third.validate()
      } catch (err) {
        expect(err.errors.length).to.equal(1)
        expect(err.errors[0].message).to.equal('Validation isEmail on email failed')
      }
    })
  }) // end describe Model Properties
  describe('Model structure', () => {
    let cody;
    it('does not return password/salt with default scoping', async () => {
      cody = await factory.UserFactory().save();
      const findCody = await User.findOne({ where: { id: cody.id } });
      expect(findCody.dataValues.password).to.equal(undefined)
      expect(findCody.dataValues.salt).to.equal(undefined)
    });
  }) // end describe('Model structure')
}) // end describe('User model')
