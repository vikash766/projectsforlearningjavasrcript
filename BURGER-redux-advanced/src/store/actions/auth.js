import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignup) =>{
    return dispatch => {
        dispatch(authStart());
        const authDat = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAjbLqbXWZM32X7tb3rK06mebCvcStUcFw"
        if(!isSignup){
            url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyuser?key=AIzaSyAjbLqbXWZM32X7tb3rK06mebCvcStUcFw'
        }
        axios.post(url, authDat)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
        })
        .catch(err =>{
            console.log(err);
            dispatch(authFail(err));
        })
    }
}