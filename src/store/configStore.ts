import thunkMiddleware from 'redux-thunk';
import {persistStore, persistReducer, REHYDRATE} from 'redux-persist';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {mapValues} from 'lodash';
import logger from 'redux-logger';
import {reducer as formReducer, formValues} from 'redux-form';
import * as reducers from './reducers';
import storage from 'redux-persist/lib/storage';
import {applicationReducer} from './appReducers/addUserDetails';
import {userDataChangeReducer} from './appReducers/triggerUserDataChange.reducer';

const appReducers = {
  ...mapValues(reducers, 'reducers'),
  form: formReducer,
  applicationReducer,
  userDataChangeReducer,
};

const appReducer = combineReducers(appReducers);
const rootReducer = (
  state: any,
  action: {
    type: '';
  },
) => {
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
