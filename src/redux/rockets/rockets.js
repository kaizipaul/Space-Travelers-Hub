import { loadIds, loadCache, saveCache } from '../storage';
import { LL2, fetchJson } from '../api';
import {
  setStatus, LOADING, SUCCESS, FAILED,
} from '../status/status';

const API = `${LL2}/config/launcher/?manufacturer__name=SpaceX&mode=detailed&limit=20`;
const CACHE_KEY = 'cache/rockets';
// Rocket specs rarely change, so reuse results for a day.
const CACHE_MS = 24 * 60 * 60 * 1000;
const GET_ROCKETS = 'space-travellers-hub/rockets/GET_ROCKETS';
const BOOK_ROCKET = 'space-travellers-hub/rockets/BOOK_ROCKET';
const CANCEL_BOOKING = 'space-travellers-hub/rockets/CANCEL_BOOKING';

const initialState = [];

// Keep finished vehicles with a picture and a real description; skip test articles.
const toRocket = (rocket) => ({
  id: rocket.id,
  rocket_name: rocket.full_name || rocket.name,
  description: rocket.description,
  flickr_images: [rocket.image_url],
});

const isShowable = (rocket) => rocket.image_url
  && rocket.description && rocket.description.length > 50
  && !/prototype/i.test(rocket.full_name || rocket.name);

export const fetchRockets = () => async (dispatch) => {
  dispatch(setStatus('rockets', LOADING));
  try {
    let list = loadCache(CACHE_KEY, CACHE_MS);
    if (!list) {
      const response = await fetchJson(API);
      list = response.results.filter(isShowable).map(toRocket);
      saveCache(CACHE_KEY, list);
    }
    const reservedIds = loadIds('rockets');
    const rockets = list.map((rocket) => ({
      ...rocket,
      reserved: reservedIds.includes(rocket.id),
    }));

    dispatch({
      type: GET_ROCKETS,
      payload: rockets,
    });
    dispatch(setStatus('rockets', SUCCESS));
  } catch (error) {
    dispatch(setStatus('rockets', FAILED));
  }
};

export const bookRocket = (payload) => ({
  type: BOOK_ROCKET,
  payload,
});

export const cancelBooking = (payload) => ({
  type: CANCEL_BOOKING,
  payload,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROCKETS: return [...action.payload];
    case BOOK_ROCKET:
      return state.map((rocket) => {
        if (rocket.id !== action.payload) return rocket;
        return { ...rocket, reserved: true };
      });
    case CANCEL_BOOKING:
      return state.map((rocket) => {
        if (rocket.id !== action.payload) return rocket;
        return { ...rocket, reserved: false };
      });
    default:
      return state;
  }
};

export const rockets = (state) => state.rockets;
export default reducer;
