import React, { useState } from 'react'
import { connect } from 'react-redux'
import { sendResetEmail } from '../store'
import validator from 'validator'

const ForgotPassword = ({ dispatchEmail, error, resetEmailSentMessage }) => {
    const [email, setEmail] = useState('')
    const [formError, setFormError] = useState('')
    const handleChange = e => {
        if (error) {
            setFormError(null)
        }
        setEmail(e.target.value)
    }
    const sendEmail = e => {
        e.preventDefault();
        if (!validator.isEmail(email)) {
            setFormError('Email must be properly formatted')
        }
        dispatchEmail(email)
    }
    return (
        <form onSubmit={sendEmail}>
            <div>
                <label htmlFor="email">
                    <small>Email</small>
                </label>
                <input name="email" type="text" onChange={handleChange} />
                {
                    formError && <div>{formError}</div>
                }
            </div>
            <button type="submit">Reset</button>
            {
                error && <div>{error}</div>
            }
            {
                resetEmailSentMessage && <div>{resetEmailSentMessage}</div>
            }
        </form>
    )
}

const mapState = state => ({
    resetEmailSentMessage: state.passwordReset.resetEmailSentMessage,
    error: state.passwordReset.error
});

const mapDispatch = dispatch => ({
    dispatchEmail(email) {
        dispatch(sendResetEmail(email))
    }
})
export default connect(mapState, mapDispatch)(ForgotPassword)
