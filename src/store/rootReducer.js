import { combineReducers } from 'redux'

// reducers
import auth from '../components/Auth/reducer'
import addSpend from '../components/Dashboard/AddSpend/reducer'
import onboarding from '../components/Onboarding/reducer'
import household from '../components/Household/reducer'
import { flashMessages } from '../redux/reducers/flashMessages'

export default combineReducers({
  auth,
  onboarding,
  household,
  addSpend,
  flashMessages,
})
