import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utilities/setAuthToken';
import handleErr from '../../redux/actions/errors';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});

export const register = userdata =>
  axios.post('api/users', userdata).then((res) => {
    console.log(res);
  });

export const login = data => dispatch =>
  axios.post('auth/signin', data).then((res) => {
    const { token } = res.data;
    localStorage.setItem('mm-jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwtDecode(token)));
  });

export const logout = () => (dispatch) => {
  localStorage.removeItem('mm-jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const checkAuth = () => dispatch =>
  axios.get('auth/check-auth').catch(err => dispatch(handleErr(err)));