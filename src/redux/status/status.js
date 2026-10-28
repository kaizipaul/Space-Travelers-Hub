const SET_STATUS = 'space-travellers-hub/status/SET_STATUS';

export const LOADING = 'loading';
export const SUCCESS = 'success';
export const FAILED = 'failed';

const initialState = { rockets: 'idle', missions: 'idle', launches: 'idle' };

export const setStatus = (resource, status) => ({
  type: SET_STATUS,
  payload: { resource, status },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS:
      return { ...state, [action.payload.resource]: action.payload.status };
    default:
      return state;
  }
};

export default reducer;
