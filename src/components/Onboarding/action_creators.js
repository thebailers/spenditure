import uniqid from 'uniqid';
import { database } from '../../firebase';

export const FETCH_ONBOARD_STATUS = 'FETCH_ONBOARD_STATUS';
export const REQUEST_ERROR = 'REQUEST_ERROR';

const fetchHouseholdUsers = (household) => {
  const ref = database.ref(`spenditure/household/${household}/users`);
  return ref.once('value', snapshot => snapshot.val());
};

const requestError = error => ({ type: REQUEST_ERROR, payload: error });

const receiveOnboardedStatus = onboarded => ({
  type: FETCH_ONBOARD_STATUS,
  payload: onboarded,
});

export const fetchOnboardedStatus = userId => dispatch =>
  new Promise((resolve, reject) => {
    const ref = database.ref(`spenditure/users/${userId}`);
    ref.once('value').then(
      (res) => {
        const onboarded = res.child('onboarded').val();
        resolve(dispatch(receiveOnboardedStatus(onboarded)));
      },
      (err) => {
        reject(dispatch(requestError(err)));
      },
    );
  });

export const generateHouseholdID = (household, user) => dispatch =>
  new Promise((resolve, reject) => {
    console.log('----');
    console.log(fetchHouseholdUsers(user.uid));
    console.log(user);
    console.log(household);

    // add onboarded stage 1 and stage 2 in resolve if successful (1 true, 2 false)
    database.ref(`spenditure/households/${uniqid.time()}`).set({
      users: [...fetchHouseholdUsers(user.uid), ...user.uid],
    });

    // add household id to the users households array
  });
