import { actionTypes } from './actionTypes';
import axios from 'axios';
import constants from 'config/constants';
import { getValueFromLocal } from 'utils/storage';

export function getTags() {
  return {
    type: actionTypes.GET_USERS_REQUEST
  }
}
    
export function getTagsSuccess(tags) {
  return {
    type: actionTypes.GET_CONFIG_SUCCESS,
    payload: tags
  }
}
    
export function getTagsFailure(error) {
  return {
    type: actionTypes.GET_CONFIG_FAILURE,
    payload: error
  }
}

export const fetchTags = () => {
  return dispatch => {
    dispatch(getTags());
    axios
      .get(`${constants.url}/tags`, 
        { headers: { Authorization: getValueFromLocal(constants['JWT_ACCESS_KEY']) } })
      .then(res => dispatch(getTagsSuccess(res.data)))
      .catch(err => dispatch(getTagsFailure(err)))
  }
}