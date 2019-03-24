const User = require('./user')
const InterviewQuestion = require('./interviewQuestion')
const WorkExperience = require('./workExperience')
const Skills = require('./skills')
const Education = require('./education')
const Projects = require('./projects')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Skills.belongsToMany(User, { through: 'UserSkills' })
User.belongsToMany(Skills, { through: 'UserSkills' })
User.hasMany(WorkExperience)
User.hasMany(Education)
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  InterviewQuestion,
  WorkExperience,
  Skills,
  Education,
  Projects
}
