import { User, InterviewQuestion, Skills, WorkExperience, Projects, Education, Jobs, Schedule } from '../db/models'
const faker = require('faker')
const uuid = require('uuidv4')
const UserFactory = params => {
  const randomizedAttributes = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    position: 'Software Developer',
    minSalary: faker.commerce.price(),
    maxSalary: faker.commerce.price(),
    description: faker.lorem.text(),
    photoDescription: faker.image.imageUrl(),
    videoDescription: faker.image.imageUrl(),
    userLevel: 'Employee'
  }
  return User.build(Object.assign(randomizedAttributes, params))
}
const InterviewQuestionFactory = params => {
  const randomizedAttributes = {
    question: faker.lorem.text(),
    hints: [faker.lorem.text(), faker.lorem.text()],
    answer: faker.lorem.text()
  }
  return InterviewQuestion.build(Object.assign(randomizedAttributes, params))
}

const SkillsFactory = params => {
  const randomizedAttributes = {
    skill: 'Javascript',
    level: 'Proficient'
  }
  return Skills.build(Object.assign(randomizedAttributes, params))
}

const ProjectsFactory = params => {
  const randomizedAttributes = {
    name: 'Random Project',
    startDate: faker.date.past(),
    endDate: faker.date.past(),
    website: faker.internet.url(),
    description: faker.lorem.text()
  }
  return Projects.build(Object.assign(randomizedAttributes, params))
}
const WorkExperienceFactory = params => {
  const randomizedAttributes = {
    companyName: 'Google',
    jobTitle: 'Software Engineer',
    startDate: faker.date.past(),
    endDate: faker.date.past(),
    companySite: faker.internet.url(),
    description: faker.lorem.text()
  }
  return WorkExperience.build(Object.assign(randomizedAttributes, params))
}

const EducationFactory = params => {
  const randomizedAttributes = {
    schoolName: 'Hogwarts School of Witchcraft',
    startDate: faker.date.past(),
    endDate: faker.date.past(),
    degree: 'Bachelor of Arts in Potions'
  }
  return Education.build(Object.assign(randomizedAttributes, params))
}

const JobFactory = params => {
  const randomizedAttributes = {
    description: 'This position is for a 3 year exp. software developer with great people skills.',
    salary: '100,000.00',
    requirements: ['BA or similar', '3 years of Javascript knowledge', 'Strong familiarity with HTML'],
    preferred: ['Ability to relocate', 'Knowledge of React/Vue/Angular'],
    location: 'Atlanta, GA'
  }
  return Jobs.build(Object.assign(randomizedAttributes, params))
}

const ScheduleFactory = params => {
  const randomizedAttributes = {
    startTime: '8:00AM',
    endTime: '9:00AM',
    date: faker.date.past(),
    status: 'Available'
  }
  return Schedule.build(Object.assign(randomizedAttributes, params))
}

module.exports = {
  UserFactory,
  InterviewQuestionFactory,
  SkillsFactory,
  WorkExperienceFactory,
  EducationFactory,
  ProjectsFactory,
  JobFactory,
  ScheduleFactory
}
