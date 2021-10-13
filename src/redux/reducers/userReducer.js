import { actionTypes } from '../actions/actionTypes';

const initialState = {
  isLoading: [],
  callFailed: [],
  callSuccessful: [],
  users: [],
  messages: [],
  message: '',
  error: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.GET_USERS_REQUEST:
    return {
      ...state,
      isCalling: [...state.isLoading, "GET_USERS_REQUEST"],
      callFailed: state.isLoading.filter(function(value){ return value !== 'GET_USERS_REQUEST'}),
      callSuccessful: state.isLoading.filter(function(value){ return value !== 'GET_USERS_REQUEST'}),
      error: ''
    }
  case actionTypes.GET_USERS_SUCCESS:
    return {
      ...state,
      isCalling: state.isLoading.filter(function(value){ return value !== 'GET_USERS_REQUEST'}),
      callSuccessful: [...state.isLoading, "GET_USERS_REQUEST"],
      users: action.payload.data
    }
  case actionTypes.GET_USERS_FAILURE:
    return {
      ...state,
      isCalling: state.isLoading.filter(function(value){ return value !== 'GET_USERS_REQUEST'}),
      callFailed: [...state.isLoading, "GET_USERS_REQUEST"],
      error: action.payload
    }
  case actionTypes.GET_MESSAGES_REQUEST:
    return {
      ...state,
      isCalling: [...state.isLoading, "GET_MESSAGES_REQUEST"],
      callFailed: state.isLoading.filter(function(value){ return value !== 'GET_MESSAGES_REQUEST'}),
      callSuccessful: state.isLoading.filter(function(value){ return value !== 'GET_MESSAGES_REQUEST'}),
      error: ''
    }
  case actionTypes.GET_MESSAGES_SUCCESS:
    return {
      ...state,
      isCalling: state.isLoading.filter(function(value){ return value !== 'GET_MESSAGES_REQUEST'}),
      callSuccessful: [...state.isLoading, "GET_MESSAGES_REQUEST"],
      messages: action.payload.data
    }
  case actionTypes.GET_MESSAGES_FAILURE:
    return {
      ...state,
      isCalling: state.isLoading.filter(function(value){ return value !== 'GET_MESSAGES_REQUEST'}),
      callFailed: [...state.isLoading, "GET_MESSAGES_REQUEST"],
      error: action.payload
    }
  case actionTypes.SEND_MESSAGE_REQUEST:
    return {
      ...state,
      isCalling: [...state.isLoading, "SEND_MESSAGE_REQUEST"],
      callFailed: state.isLoading.filter(function(value){ return value !== 'SEND_MESSAGE_REQUEST'}),
      callSuccessful: state.isLoading.filter(function(value){ return value !== 'SEND_MESSAGE_REQUEST'}),
      error: ''
    }
  case actionTypes.SEND_MESSAGE_SUCCESS:
    return {
      ...state,
      isCalling: state.isLoading.filter(function(value){ return value !== 'SEND_MESSAGE_REQUEST'}),
      callSuccessful: [...state.isLoading, "SEND_MESSAGE_REQUEST"],
      message: action.payload.data
    }
  case actionTypes.SEND_MESSAGE_FAILURE:
    return {
      ...state,
      isCalling: state.isLoading.filter(function(value){ return value !== 'SEND_MESSAGE_REQUEST'}),
      callFailed: [...state.isLoading, "SEND_MESSAGE_REQUEST"],
      error: action.payload
    }
  default: 
    return state
  }
}