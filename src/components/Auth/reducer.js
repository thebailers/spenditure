import {RECEIVE_USER, SET_CURRENT_USER} from './action_creators';

const INITIAL_STATE = {
  user: {},
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return {
        ...state,
        user: {
          jwt: action.payload.jwt,
        },
      };
    default:
      return state;
  }
};

export default auth;
