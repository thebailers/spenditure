import setAuthToken from '../../utilities/setAuthToken';
import { setCurrentUser } from '../../redux/actions/authActions';

const handleErr = (err) => {
  if (err.status === 401 || err.status === 404) {
    localStorage.removeItem('mm-jwtToken');
    setAuthToken(false);
    return setCurrentUser({});
  }
};

export default handleErr;
