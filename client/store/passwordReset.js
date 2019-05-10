import axios from 'axios'
import history from '../history'


/**
 * ACTION TYPES
 */
const RESET_MESSAGE_SENT_SUCCESS = 'RESET_MESSAGE_SENT_SUCCESS';
const RESET_SUCCESS = 'RESET_SUCCESS';
const RESET_ERROR = 'RESET_ERROR';
const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';

const setSentResetMessage = resetEmailSentMessage => ({ type: RESET_MESSAGE_SENT_SUCCESS, resetEmailSentMessage })
const setMessage = resetSuccessMessage => ({ type: RESET_SUCCESS, resetSuccessMessage })
const setError = error => ({ type: RESET_ERROR, error })
const setTokenFetchSuccessMessage = fetchTokenSuccessMessage => ({ type: FETCH_TOKEN_SUCCESS, fetchTokenSuccessMessage })

export const sendResetEmail = email => async dispatch => {
    const res = await axios.post('/auth/forgotPassword', {
        email
    });
    if (res.status === 200) {
        dispatch(setSentResetMessage('If this email matches an account in the system, a reset link will arrive shortly.'))
    } else {
        dispatch(setError('We are sorry. An error occurred while processing your request. Please try again soon or contact our team to get this all figured out!'))
    }
}

export const fetchExpirationTime = (token) => async dispatch => {
    const res = await axios.get(`/auth/forgotPassword/${token}`);
    if (res.status === 200) {
        dispatch(setTokenFetchSuccessMessage(res.data.message))
    } else {
        dispatch(setError(res.data.message))
    }
}

export const handleResetPwd = pwdObj => async dispatch => {
    const { data, status } = await axios.put('/auth/forgotPassword', { password: pwdObj.password, token: pwdObj.token });
    if (status === 200) {

        dispatch(setMessage(data.message))
        history.push('/home')
    } else {
        dispatch(setError(data.error))
        history.push('/home')
    }
}

export const resetPassword = (state = { resetEmailSentMessage: '', error: null, fetchTokenSuccessMessage: '', resetSuccessMessage: '' }, action) => {
    switch (action.type) {
        case RESET_MESSAGE_SENT_SUCCESS:
            return { ...state, resetEmailSentMessage: action.resetEmailSentMessage }
        case RESET_SUCCESS:
            return { ...state, resetSuccessMessage: action.resetSuccessMessage }
        case FETCH_TOKEN_SUCCESS:
            return { ...state, fetchTokenSuccessMessage: action.fetchTokenSuccessMessage }
        case RESET_ERROR:
            return { ...state, error: action.error }
        default:
            return state
    }
}
export default resetPassword
