import { FETCH_ONBOARD_STATUS } from './action_creators'

const INITIAL_STATE = {
  onboarded: false,
}

const onboarding = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ONBOARD_STATUS:
      return {
        ...state,
        onboarded: action.payload,
      }
    default:
      return state
  }
}

export default onboarding
