const UPDATE_USER = 'UPDATE_USER';
const UPDATE_USER_LOCATION = 'UPDATE_USER_LOCATION';

const initialState = {}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, ...state.payload, ...action.payload };
    case UPDATE_USER_LOCATION:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}

export function updateUser(e) {
  const { name, value } = e.target;
  return {
    type: UPDATE_USER,
    payload: { [name]: value }
  }
}

export function updateUserLocation(obj) {
  return {
    type: UPDATE_USER_LOCATION,
    payload: obj
  }
}