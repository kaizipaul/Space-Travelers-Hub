import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rocketsReducer from './rockets/rockets';
import missionsReducer from './missions/missions';
import launchesReducer from './launches/launches';
import statusReducer from './status/status';
import { saveIds } from './storage';

const reducer = combineReducers({
  rocketsReducer, missionsReducer, launchesReducer, statusReducer,
});

const middleware = process.env.NODE_ENV === 'production'
  ? [thunkMiddleware]
  : [logger, thunkMiddleware];

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

// Persist reservations once data has loaded, so an empty pre-fetch state never wipes them.
const saved = {};
store.subscribe(() => {
  const state = store.getState();
  [
    ['rockets', state.rocketsReducer, state.statusReducer.rockets],
    ['missions', state.missionsReducer, state.statusReducer.missions],
  ].forEach(([key, items, status]) => {
    if (status !== 'success') return;
    const ids = items.filter((item) => item.reserved).map((item) => item.id);
    const serialized = JSON.stringify(ids);
    if (saved[key] !== serialized) {
      saved[key] = serialized;
      saveIds(key, ids);
    }
  });
});

export default store;
