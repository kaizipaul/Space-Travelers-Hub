import { loadIds } from '../storage';
import {
  setStatus, LOADING, SUCCESS, FAILED,
} from '../status/status';

const API = 'https://api.spacexdata.com/v3/rockets';
const GET_ROCKETS = 'space-travellers-hub/rockets/GET_ROCKETS';
const BOOK_ROCKET = 'space-travellers-hub/rockets/BOOK_ROCKET';
const CANCEL_BOOKING = 'space-travellers-hub/rockets/CANCEL_BOOKING';

const initialState = [];

export const fetchRockets = () => async (dispatch) => {
  dispatch(setStatus('rockets', LOADING));
  try {
    const fetched = await fetch(`${API}`);
    if (!fetched.ok) throw new Error(`Request failed with ${fetched.status}`);
    const response = await fetched.json();
    const reservedIds = loadIds('rockets');
    const rockets = response.map((rocket) => ({
      id: rocket.id,
      rocket_name: rocket.rocket_name,
      description: rocket.description,
      flickr_images: rocket.flickr_images,
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
