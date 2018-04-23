import { combineReducers } from 'redux';

// reducers
import auth from '../redux/reducers/auth';
import addSpend from '../components/Dashboard/AddSpend/reducer';
import onboarding from '../components/Onboarding/reducer';
import household from '../components/Household/reducer';
import { flashMessages } from '../redux/reducers/flashMessages';

export default combineReducers({
  auth,
  onboarding,
  household,
  addSpend,
  flashMessages,
});
