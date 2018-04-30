import { RECEIVE_HOUSEHOLD } from './action_creators'

const INITIAL_STATE = {}

const household = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_HOUSEHOLD:
      return {
        ...state,
        uid: action.payload,
      }
    default:
      return state
  }
}

export default household
