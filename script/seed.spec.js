'use strict'
/* global describe beforeEach it */

const seed = require('./seed')
const {User} = require('../server/db/models')

describe('seed script', () => {
  after(async () => {
    await User.destroy({cascade: true, truncate: true})
  })
  it('completes successfully', seed)
})
