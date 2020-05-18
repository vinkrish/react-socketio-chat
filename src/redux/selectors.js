import constants from 'config/constants';
import { getValueFromLocal } from 'utils/storage';

export const getIsLoggingIn = store => store.isLoggingIn;

export const checkAuthentication = () => {
  const isAuthenticated = getValueFromLocal(constants.JWT_ACCESS_KEY);
  return isAuthenticated ? true : false; 
}
