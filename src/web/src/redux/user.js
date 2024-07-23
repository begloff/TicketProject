//Actions
const CREATE_USER = 'user/CREATE_USER';
const LOAD_USER = 'user/LOAD_USER';

//Reducer
const initialState = {
  data: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, data: action.user };
    case LOAD_USER:
      return { ...state, data: action.user };
    default:
      return state;
  }
}

//Action Creators
export function createUser(user) {
  return { type: CREATE_USER, user };
}

export function loadUser(user) {
  return { type: LOAD_USER, user };
}
