import { GET_USERS } from "./action";

const initialState = { allUsers: [], post: [] };

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
