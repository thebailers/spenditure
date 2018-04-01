import uniqid from 'uniqid';
import { database } from '../../firebase';

export const FETCH_ONBOARD_STATUS = 'FETCH_ONBOARD_STATUS';
export const REQUEST_ERROR = 'REQUEST_ERROR';

const fetchHouseholdUsers = household =>
  database.ref(`spenditure/household/${household}/users`).once('value', snapshot => snapshot.val());

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

export const generateHouseholdID = (household, user) => (dispatch) => {
  const { uid } = user;
  const householdId = uniqid.time();

  const setHousehold = () =>
    new Promise((resolve, reject) => {
      // add onboarded stage 1 and stage 2 in resolve if successful (1 true, 2 false)
      database.ref(`spenditure/households/${householdId}`).set(
        {
          users: [...fetchHouseholdUsers(uid), uid],
        },
        () => resolve(),
      );
    });

  const setUser = () =>
    new Promise((resolve, reject) => {
      // add household id to the users households array
      database.ref(`spenditure/users/${uid}`).update(
        {
          household: householdId,
        },
        () => resolve(),
      );
    });

  return Promise.all([setHousehold(), setUser()]);
};
