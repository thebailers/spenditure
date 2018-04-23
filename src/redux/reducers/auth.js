import { SET_CURRENT_USER } from '../actions/authActions';

const INITIAL_STATE = {
  user: {},
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: {
          jwt: action.user,
        },
      };
    default:
      return state;
  }
};

export default auth;
