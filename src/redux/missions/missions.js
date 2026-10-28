import { loadIds } from '../storage';
import {
  setStatus, LOADING, SUCCESS, FAILED,
} from '../status/status';

const apiUrl = 'https://api.spacexdata.com/v3/missions';
const GET_MISSIONS = 'space-travellers-hub/missions/GET_MISSIONS';
const BOOK_MISSION = 'space-travellers-hub/missions/BOOK_MISSION';
const CANCEL_MISSION = 'space-travellers-hub/missions/CANCEL_MISSION';

const initialState = [];

export const fetchMissions = () => async (dispatch) => {
  dispatch(setStatus('missions', LOADING));
  try {
    const fetched = await fetch(`${apiUrl}`);
    if (!fetched.ok) throw new Error(`Request failed with ${fetched.status}`);
    const response = await fetched.json();
    const reservedIds = loadIds('missions');
    const missions = response.map((mission) => ({
      id: mission.mission_id,
      mission_name: mission.mission_name,
      description: mission.description,
      reserved: reservedIds.includes(mission.mission_id),
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
