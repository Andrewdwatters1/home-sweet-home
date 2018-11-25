const UPDATE_QUERY = 'UPDATE_QUERY';

const initialState = {}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}

export function updateQuery(obj) {
  return {
    type: UPDATE_QUERY,
    payload: obj
  }
}