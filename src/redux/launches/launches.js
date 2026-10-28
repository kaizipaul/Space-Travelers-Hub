import { loadCache, saveCache } from '../storage';
import {
  setStatus, LOADING, SUCCESS, FAILED,
} from '../status/status';

// Launch Library 2 keeps current data (the community SpaceX API stopped updating).
const API = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=7&hide_recent_previous=true';
const GET_LAUNCHES = 'space-travellers-hub/launches/GET_LAUNCHES';
const CACHE_KEY = 'launches';
// The free tier allows ~15 requests/hour, so reuse results for 10 minutes.
const CACHE_MS = 10 * 60 * 1000;

const initialState = [];

const toLaunch = (launch) => ({
  id: launch.id,
  name: launch.name,
  net: launch.net,
  status: launch.status ? launch.status.abbrev : 'TBD',
  provider: launch.launch_service_provider ? launch.launch_service_provider.name : 'Unknown',
  rocket: launch.rocket && launch.rocket.configuration ? launch.rocket.configuration.name : '',
  location: launch.pad && launch.pad.location ? launch.pad.location.name : '',
  image: launch.image || null,
});

export const fetchLaunches = () => async (dispatch) => {
  const cached = loadCache(CACHE_KEY, CACHE_MS);
  if (cached) {
    dispatch({ type: GET_LAUNCHES, payload: cached });
    dispatch(setStatus('launches', SUCCESS));
    return;
  }

  dispatch(setStatus('launches', LOADING));
  try {
    const fetched = await fetch(API);
    if (!fetched.ok) throw new Error(`Request failed with ${fetched.status}`);
    const response = await fetched.json();
    const launches = response.results.map(toLaunch);
    saveCache(CACHE_KEY, launches);
    dispatch({ type: GET_LAUNCHES, payload: launches });
    dispatch(setStatus('launches', SUCCESS));
  } catch (error) {
    dispatch(setStatus('launches', FAILED));
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LAUNCHES: return [...action.payload];
    default:
      return state;
  }
};

export default reducer;
