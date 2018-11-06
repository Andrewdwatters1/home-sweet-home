const UPDATE_USER = 'UPDATE_USER';

const initialState = {
  userInfo: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      const key = Object.keys(action.payload)[0];
      const val = Object.values(action.payload)[0]
      return { ...state, userInfo: [...state.userInfo, { [key]: val }] }
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