import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import configReducer from './configReducer';
import { reducer as reduxFormReducer } from 'redux-form';

const appReducer = combineReducers({
  form: reduxFormReducer,
  authReducer,
  userReducer,
  configReducer
})
  
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
}
  
export default rootReducer;