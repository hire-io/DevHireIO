import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import states from '../utils/states'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, error, authFunc } = props
  const [form, setForm] = useState({ userLevel: displayName === 'Employer Signup' ? 'Employer' : 'Employee' });
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = e => {
    e.preventDefault();
    authFunc(form, name)
  }
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" onChange={handleChange} />
        </div>
        {
          name === 'employerSignup' && <>
            <div>
              <label htmlFor="companyName">
                <small>Company Name</small>
              </label>
              <input name="companyName" type="text" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="city">
                <small>city</small>
              </label>
              <input name="city" type="text" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="state">
                <small>state</small>
              </label>
              <select name="state" type="text" onChange={handleChange}>
                {
                  Object.keys(states).map(state => (
                    <option key={state} value={state}>
                      {states[state]}
                    </option>
                  ))
                }
              </select>
            </div>
          </>
        }
        {
          name === 'signup' && <>
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input name="firstName" type="text" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input name="lastName" type="text" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="city">
                <small>city</small>
              </label>
              <input name="city" type="text" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="state">
                <small>state</small>
              </label>
              <select name="state" type="text" onChange={handleChange}>
                {
                  Object.keys(states).map(state => (
                    <option key={state} value={state}>
                      {states[state]}
                    </option>
                  ))
                }
              </select>
            </div>
            <div>
              <label htmlFor="minSalary">
                <small>minSalary</small>
              </label>
              <input name="minSalary" type="text" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="maxSalary">
                <small>maxSalary</small>
              </label>
              <input name="maxSalary" type="text" onChange={handleChange} />
            </div>
          </>
        }
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapEmployerSignup = state => {
  return {
    name: 'employerSignup',
    displayName: 'Employer Signup',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    authFunc(form, type) {
      if (type === 'employerSignup') type = 'signup'
      dispatch(auth(form, type))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
export const EmployerSignup = connect(mapEmployerSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object
}
