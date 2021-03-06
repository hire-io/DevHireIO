const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const ATTRIBUTE_WHITELIST = ['id', 'firstName', 'lastName', 'email', 'city', 'state', 'position', 'minSalary', 'maxSalary', 'description', 'photoDescription', 'video', 'userLevel']
const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    validate: {
      isEmployer(val) {
        if (this.userLevel === 'Employee' && !val) {
          throw new Error('Must enter first name')
        }
      }
    }
  },
  lastName: {
    type: Sequelize.STRING,
    validate: {
      isEmployer(val) {
        if (this.userLevel === 'Employee' && !val) {
          throw new Error('Must enter last name')
        }
      }
    }
  },
  companyName: {
    type: Sequelize.STRING,
    validate: {

    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
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
      notEmpty: true,
      len: [2, 2]
    }
  },
  position: {
    type: Sequelize.STRING
  },
  minSalary: {
    type: Sequelize.STRING,
    validate: {
      isEmployer(val) {
        if (this.userLevel === 'Employee' && !val.length) {
          throw new Error('Must enter minimum salary.')
        }
      }
    }
  },
  maxSalary: {
    type: Sequelize.STRING,
    validate: {
      isEmployer(val) {
        console.log(val)
        if (this.userLevel === 'Employee' && !val.length) {
          throw new Error('Must enter maximum salary')
        }
      }
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
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['Employee', 'Employer']]
    }
  },
  resetPasswordToken: {
    type: Sequelize.STRING
  },
  resetPasswordExpires: {
    type: Sequelize.DATE
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
    .scryptSync(plainText, salt, 64)
    .toString('hex')
}

User.addScope('noToken', { attributes: ATTRIBUTE_WHITELIST })
User.addScope('withToken', { attributes: [...ATTRIBUTE_WHITELIST, 'resetPasswordToken', 'resetPasswordExpires'] })
/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    console.log('changed password')
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
