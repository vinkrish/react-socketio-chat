import { actionTypes } from './actionTypes';
import axios from 'axios';
import constants from 'config/constants';
import { getValueFromLocal } from 'utils/storage';

export function getUsers() {
  return {
    type: actionTypes.GET_USERS_REQUEST
  }
}
    
export function getUsersSuccess(users) {
  return {
    type: actionTypes.GET_USERS_SUCCESS,
    payload: users
  }
}
    
export function getUsersFailure(error) {
  return {
    type: actionTypes.GET_USERS_FAILURE,
    payload: error
  }
}

export function getMessages() {
  return {
    type: actionTypes.GET_MESSAGES_REQUEST
  }
}
    
export function getMessagesSuccess(messages) {
  return {
    type: actionTypes.GET_MESSAGES_SUCCESS,
    payload: messages
  }
}
    
export function getMessagesFailure(error) {
  return {
    type: actionTypes.GET_MESSAGES_FAILURE,
    payload: error
  }
}

export function sendMessage() {
  return {
    type: actionTypes.SEND_MESSAGE_REQUEST
  }
}
  
export function sendMessageSuccess(message) {
  return {
    type: actionTypes.SEND_MESSAGE_SUCCESS,
    payload: message
  }
}
  
export function sendMessageFailure(error) {
  return {
    type: actionTypes.SEND_MESSAGE_FAILURE,
    payload: error
  }
}

export const fetchUsers = () => {
  return dispatch => {
    dispatch(getUsers());
    axios
      .get(`${constants.url}/auth/users`, 
        { headers: { Authorization: getValueFromLocal(constants['JWT_ACCESS_KEY']) } })
      .then(res => dispatch(getUsersSuccess(res.data)))
      .catch(err => dispatch(getUsersFailure(err)))
  }
}

export const fetchMessages = () => {
  return dispatch => {
    dispatch(getMessages());
    axios
      .get(`${constants.url}/message`, 
        { headers: { Authorization: getValueFromLocal(constants['JWT_ACCESS_KEY']) } })
      .then(res => dispatch(getMessagesSuccess(res.data)))
      .catch(err => dispatch(getMessagesFailure(err)))
  }
}

export const pushMessage = (msg) => {
  return dispatch => {
    dispatch(sendMessage());
    axios
      .post(`${constants.url}/message`, msg,
        { headers: { Authorization: getValueFromLocal(constants['JWT_ACCESS_KEY']) } })
      .then(res => dispatch(sendMessageSuccess(res.data)))
      .catch(err => dispatch(sendMessageFailure(err)))
  }
}
