import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import {
  persistStore,
  persistReducer,
  // createMigrate
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers/';
import {
  asyncDispatchMiddleware,
  asyncFunctionMiddleware,
} from './middleware/asyncMiddleware';
import rootSaga from './sagas';

// reducer
import {AuthState} from './reducers/authReducer';
import {ParkingLotState} from './reducers/parkingLotReducer';
import {CustomerState} from './reducers/customerReducer';
import {SettingsState} from './reducers/settingsReducer';

const logger = createLogger({
  collapsed: true,
  timestamp: false,
  duration: true,
  level: 'info',
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  debug: false,
  keyPrefix: '',
  whitelist: ['session', 'notification'],
  //   migrate: createMigrate(migrations, { debug: false }),
};

const sagaMiddleware = createSagaMiddleware();

const middlewareProduction = [
  asyncFunctionMiddleware,
  asyncDispatchMiddleware,
  sagaMiddleware,
];

if (__DEV__) {
  middlewareProduction.push(logger);
}

const store = createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(...middlewareProduction),
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export interface RootState {
  auth: AuthState;
  parkingLot: ParkingLotState;
  customer: CustomerState;
  settings: SettingsState;
}

export default store;
