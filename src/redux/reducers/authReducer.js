import { actionTypes } from 'redux/actions/actionTypes';
import { saveValueInLocal } from 'utils/storage';
import constants from 'config/constants';

const initialState = {
  isLoading: false,
  actionFailed: false,
  userId: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.USER_SIGNUP_REQUEST: 
    return {
      isLoading: true,
      actionFailed: false
    }
  case actionTypes.USER_SIGNUP_SUCCESS:
    return {
      isLoading: false,
      actionFailed: false
    }
  case actionTypes.USER_SIGNUP_FAILURE:
    return {
      isLoading: false,
      actionFailed: true,
      error: action.payload
    }
  case actionTypes.USER_LOGIN_REQUEST: 
    return {
      isLoading: true,
      actionFailed: false
    }
  case actionTypes.USER_LOGIN_SUCCESS:
    saveValueInLocal(constants.JWT_ACCESS_KEY, action.payload.data.token);
    saveValueInLocal(constants.USER_ID, action.payload.data.id);
    saveValueInLocal(constants.FIRST_NAME, action.payload.data.firstName);
    saveValueInLocal(constants.LAST_NAME, action.payload.data.lastName);
    saveValueInLocal(constants.EMAIL, action.payload.data.email);
    return {
      isLoading: false,
      actionFailed: false
    }
  case actionTypes.USER_LOGIN_FAILURE:
    return {
      isLoading: false,
      actionFailed: true,
      error: action.payload
    }
  default: 
    return state
  }
}