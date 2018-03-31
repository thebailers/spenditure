import { combineReducers } from 'redux';

// reducers
import auth from '../components/Auth/reducer';
import addSpend from '../components/Dashboard/AddSpend/reducer';
import onboarding from '../components/Onboarding/reducer';

export default combineReducers({
  auth,
  onboarding,
  addSpend,
});
