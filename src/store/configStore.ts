import thunkMiddleware from 'redux-thunk';
import {persistStore, persistReducer, REHYDRATE} from 'redux-persist';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {mapValues} from 'lodash';
import logger from 'redux-logger';
import {reducer as formReducer} from 'redux-form';
import {LOGOUT_USER} from './actions/actions';
import {actionTypes} from './actionTypes';
import * as reducers from './reducers';
import storage from 'redux-persist/lib/storage';
import {applicationReducer} from './appReducers/addUserDetails';
import {userDataChangeReducer} from './appReducers/triggerUserDataChange.reducer';
import {logoutUser} from '../store/appReducers/logoutUser';
import {notification} from '../store/appReducers/notification';
import {policyUpdate} from './appReducers/policyUpdate';

const appReducers = {
  ...mapValues(reducers, 'reducers'),
  form: formReducer,
  applicationReducer,
  userDataChangeReducer,
  logoutUser,
  notification,
  policyUpdate,
};

const appReducer = combineReducers(appReducers);
const rootReducer = (
  state: any,
  action: {
    type: '';
  },
) => {
  if (action.type === LOGOUT_USER) {
    Object.keys(state).map(key => {
      if (key === 'form') {
        state[key] = null;
      }
      if (key === 'getUserInfo') {
        state[key] = null;
      }
    });
  }
  if (action.type === actionTypes.CLEAR_FORM_DATA) {
    Object.keys(state).map(key => {
      if (key === 'form') {
        state[key] = null;
      }
    });
  }

  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['form'], // Names of reducers which will be persisted.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleware, logger),
);
export const persistor = persistStore(store);
