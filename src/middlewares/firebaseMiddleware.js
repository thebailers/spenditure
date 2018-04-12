// https://github.com/Neshoz/WhippetWeb/blob/master/whippet/src/redux/middlewares/FirebaseMiddleware.js
import { signIn, signOut } from '../components/Auth/action_creators';

export const createFirebaseMiddleware = firebase => store => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) store.dispatch(signIn(user));
    else store.dispatch(signOut());
  });

  return next => action => {
    next(action);
  };
};
