import { actionTypes } from '../actions/actionTypes';

const initialState = {
  isLoading: [],
  callFailed: [],
  callSuccessful: [],
  tags: [],
  error: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.GET_CONFIG_REQUEST:
    return {
      ...state,
      isCalling: [...state.isLoading, "GET_CONFIG_REQUEST"],
      callFailed: state.isLoading.filter(function(value){ return value !== 'GET_CONFIG_REQUEST'}),
      callSuccessful: state.isLoading.filter(function(value){ return value !== 'GET_CONFIG_REQUEST'}),
      error: ''
    }
  case actionTypes.GET_CONFIG_SUCCESS:
    return {
      ...state,
      isCalling: state.isLoading.filter(function(value){ return value !== 'GET_CONFIG_REQUEST'}),
      callSuccessful: [...state.isLoading, "GET_CONFIG_REQUEST"],
      tags: action.payload.data
    }
  case actionTypes.GET_CONFIG_FAILURE:
    return {
      ...state,
      isCalling: state.isLoading.filter(function(value){ return value !== 'GET_CONFIG_REQUEST'}),
      callFailed: [...state.isLoading, "GET_CONFIG_REQUEST"],
      error: action.payload
    }
  default: 
    return state
  }
}