import { SET_CURRENT_USER } from './action_creators'

const INITIAL_STATE = {
  user: {},
}

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.user,
      }
    default:
      return state
  }
}

export default auth
