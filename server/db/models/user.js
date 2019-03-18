const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const ATTRIBUTE_WHITELIST = ['firstName', 'lastName', 'email', 'city', 'state', 'position', 'minSalary', 'maxSalary', 'description', 'photoDescription', 'video', 'userLevel']
const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  position: {
    type: Sequelize.STRING
  },
  minSalary: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  maxSalary: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  photoDescription: {
    type: Sequelize.STRING,
    allowNull: true
  },
  video: {
    type: Sequelize.STRING,
    allowNull: true
  },
  userLevel: {
    type: Sequelize.ENUM(['Employee', 'Employer']),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

User.addScope('defaultScope', { attributes: ATTRIBUTE_WHITELIST }, { override: true })
/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
