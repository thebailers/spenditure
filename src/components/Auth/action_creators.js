import { app } from '../../firebase';

export const RECEIVE_USER = 'RECEIVE_USER';
export const NO_USER = 'NO_USER';
export const REQUEST_ERROR = 'REQUEST_ERROR';

const receiveUser = user => ({ type: RECEIVE_USER, payload: user });
const noUser = () => ({ type: NO_USER });
const requestError = error => ({ type: REQUEST_ERROR, payload: error });

export const fetchUser = () => dispatch =>
  new Promise((resolve, reject) => {
    app.auth().onAuthStateChanged(
      user => {
        if (user) {
          dispatch(receiveUser(user));
          resolve(user);
        } else {
          resolve(dispatch(noUser()));
        }
      },
      error => {
        reject(dispatch(requestError(error)));
      },
    );
  });
