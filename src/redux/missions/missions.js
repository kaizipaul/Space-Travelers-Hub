import { loadIds, loadCache, saveCache } from '../storage';
import { LL2, fetchJson } from '../api';
import {
  setStatus, LOADING, SUCCESS, FAILED,
} from '../status/status';

const apiUrl = `${LL2}/launch/previous/?lsp__name=SpaceX&limit=40`;
const CACHE_KEY = 'cache/missions';
const CACHE_MS = 30 * 60 * 1000;
const MAX_MISSIONS = 10;
const GET_MISSIONS = 'space-travellers-hub/missions/GET_MISSIONS';
const BOOK_MISSION = 'space-travellers-hub/missions/BOOK_MISSION';
const CANCEL_MISSION = 'space-travellers-hub/missions/CANCEL_MISSION';

const initialState = [];

// Recent SpaceX missions, one per name. Starlink batches are skipped: there are dozens of them.
const toMissions = (launches) => {
  const seen = new Set();
  return launches
    .map((launch) => launch.mission)
    .filter((mission) => mission && mission.description && !/starlink/i.test(mission.name))
    .filter((mission) => !seen.has(mission.name) && seen.add(mission.name))
    .slice(0, MAX_MISSIONS)
    .map((mission) => ({
      id: mission.id,
      mission_name: mission.name,
      description: mission.description,
    }));
};

export const fetchMissions = () => async (dispatch) => {
  dispatch(setStatus('missions', LOADING));
  try {
    let list = loadCache(CACHE_KEY, CACHE_MS);
    if (!list) {
      const response = await fetchJson(apiUrl);
      list = toMissions(response.results);
      saveCache(CACHE_KEY, list);
    }
    const reservedIds = loadIds('missions');
    const missions = list.map((mission) => ({
      ...mission,
      reserved: reservedIds.includes(mission.id),
    }));

    dispatch({
      type: GET_MISSIONS,
      payload: missions,
    });
    dispatch(setStatus('missions', SUCCESS));
  } catch (error) {
    dispatch(setStatus('missions', FAILED));
  }
};

export const bookMission = (payload) => ({
  type: BOOK_MISSION,
  payload,
});

export const cancelMission = (payload) => ({
  type: CANCEL_MISSION,
  payload,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MISSIONS: return [...action.payload];
    case BOOK_MISSION:
      return state.map((mission) => {
        if (mission.id !== action.payload) return mission;
        return { ...mission, reserved: true };
      });
    case CANCEL_MISSION:
      return state.map((mission) => {
        if (mission.id !== action.payload) return mission;
        return { ...mission, reserved: false };
      });
    default:
      return state;
  }
};

export const missions = (state) => state.missionsReducer;
export default reducer;
