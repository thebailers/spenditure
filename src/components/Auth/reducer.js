import { RECEIVE_USER } from './action_creators';

const INITIAL_STATE = {
  user: {},
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return {
        ...state,
        user: {
          uid: action.payload.uid,
          displayName: action.payload.displayName,
          photoURL: action.payload.photoURL,
          email: action.payload.email,
        },
      };
    default:
      return state;
  }
};

export default auth;
