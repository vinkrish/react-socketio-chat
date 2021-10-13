import { actionTypes } from './actionTypes';
import axios from "axios";
import constants from "config/constants";

export function userSignupRequest() {
  return {
    type: actionTypes.USER_SIGNUP_REQUEST
  }
}
  
export function userSignupSuccess(user) {
  return {
    type: actionTypes.USER_SIGNUP_SUCCESS,
    payload: user
  }
}
  
export function userSignupFailure(error) {
  return {
    type: actionTypes.USER_SIGNUP_FAILURE,
    payload: error
  }
}

export function userLoginRequest() {
  return {
    type: actionTypes.USER_LOGIN_REQUEST
  }
}

export function userLoginSuccess(user) {
  return {
    type: actionTypes.USER_LOGIN_SUCCESS,
    payload: user
  }
}

export function userLoginFailure(error) {
  return {
    type: actionTypes.USER_LOGIN_FAILURE,
    payload: error
  }
}

export const registerUser = (data) => {
  return dispatch => {
    dispatch(userSignupRequest());
    axios
      .post(`${constants.url}/auth/register`, data)
      .then(res => dispatch(userSignupSuccess(res.data)))
      .catch(err => dispatch(userSignupFailure(err)));
  };
};

export const authenticateUser = (data) => {
  return dispatch => {
    dispatch(userLoginRequest());
    axios
      .post(`${constants.url}/auth/login`, data)
      .then(res => dispatch(userLoginSuccess(res.data)))
      .catch(err => dispatch(userLoginFailure(err)));
  };
};