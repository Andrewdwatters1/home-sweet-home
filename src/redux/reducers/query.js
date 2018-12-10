const UPDATE_QUERY = 'UPDATE_QUERY';
const SAVE_SEARCH_RESULTS = 'SAVE_SEARCH_RESULTS';
const UPDATE_SELECTED_RESULT = 'UPDATE_SELECTED_RESULT';
// const RETAIN_SUBMITTED_QUERY = 'RETAIN_SUBMITTED_QUERY';

const initialState = {}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return { ...state, ...action.payload }
    // case RETAIN_SUBMITTED_QUERY:
    //   const { payload } = action;
    //   console.log(state);
    //   return payload
    case SAVE_SEARCH_RESULTS:
      return { ...state, ...action.payload }
    case UPDATE_SELECTED_RESULT:
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

export function saveSearchResults(records) {
  return {
    type: SAVE_SEARCH_RESULTS,
    payload: { searchResults: records }
  }
}

// export function retainSubmittedQuery(obj) {
//   return {
//     type: RETAIN_SUBMITTED_QUERY,
//     payload: obj
//   }
// }

export function updateSelectedResult(target) {
  return {
    type: UPDATE_SELECTED_RESULT,
    payload: { selectedSearchResult: target }
  }
}