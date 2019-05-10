import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchExpirationTime, handleResetPwd } from '../store'

const ResetPassword = props => {
    const { fetchResetExp, fetchTokenSuccessMessage, resetError, handleResetPassword } = props
    const determineValidToken = async () => {
        await fetchResetExp(props.match.params.token);
    }
    useEffect(() => {
        determineValidToken();
    }, [])
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [inputError, setInputError] = useState('')
    const handleChange = e => {
        e.preventDefault();
        if (e.target.name === 'password') {
            setPassword(e.target.value)
        } else if (e.target.name === 'confirmPassword') {

            if (e.target.value !== password) {
                setInputError('Passwords do not match')
            } else {
                setInputError('')
            }
            setConfirmPassword(e.target.value)
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setInputError('Passwords must match.')
        } else {
            handleResetPassword({ password, token: props.match.params.token })
        }

    }
    return (
        <>
            <div>Here is where you reset your password</div>
            {
                fetchTokenSuccessMessage && <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="password">
                            <small>Password</small>
                        </label>
                        <input name="password" type="password" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">
                            <small>Confirm Password</small>
                        </label>
                        <input name="confirmPassword" type="password" onChange={handleChange} />
                    </div>
                    <div>
                        {inputError && <small>{inputError}</small>}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            }
            {resetError && <div>{resetError}</div>}
        </>
    )
}

const mapDispatch = dispatch => ({
    fetchResetExp(token) {
        dispatch(fetchExpirationTime(token))
    },
    handleResetPassword(passObj) {
        dispatch(handleResetPwd(passObj))
    }
})
const mapState = state => ({ fetchTokenSuccessMessage: state.passwordReset.fetchTokenSuccessMessage, resetError: state.passwordReset.error })
export default connect(mapState, mapDispatch)(ResetPassword)
