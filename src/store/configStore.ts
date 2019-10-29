import {AsyncStorage} from 'react-native';
import thunkMiddleware from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {mapValues} from 'lodash';
import logger from 'redux-logger';
import {reducer as formReducer} from 'redux-form';
// import * as reducers from './reducers';

const appReducers = {
  // ...mapValues(reducers, 'reducers'),
  ...mapValues({}, 'reducers'),
  form: formReducer,
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
  storage: AsyncStorage,
  whitelist: [], // Names of reducers which will be persisted.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleware, logger),
);
export const persistor = persistStore(store);
