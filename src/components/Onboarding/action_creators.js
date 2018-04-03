import uniqid from 'uniqid';
import { database } from '../../firebase';

import { getHouseholdById, receiveHousehold } from '../Household/action_creators';

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

const createHousehold = (household, user) => (dispatch) => {
  const { uid } = user;
  const householdId = uniqid.time();

  const setHousehold = () =>
    new Promise((resolve, reject) => {
      database.ref(`spenditure/households/${householdId}`).set(
        {
          users: [...fetchHouseholdUsers(uid), uid],
        },
        () => resolve(),
      );
    });

  const setUser = () =>
    new Promise((resolve, reject) => {
      database.ref(`spenditure/users/${uid}`).update(
        {
          household: householdId,
        },
        () => resolve(dispatch(receiveHousehold(householdId))),
      );
    });

  return Promise.all([setHousehold(), setUser()]);
};

export const addHousehold = (household, user) => dispatch =>
  new Promise(async (resolve, reject) => {
    const hasHousehold = await getHouseholdById(user.uid);
    if (hasHousehold) {
      return reject(new Error('You have already generated a household. Please complete the setup steps.'));
    }
    return resolve(dispatch(createHousehold(household, user)));
  });

export const addOnboardingStages = userid => dispatch =>
  new Promise((resolve, reject) => {
    database.ref(`spenditure/users/${userid}/onboardedStages`).update(
      {
        stage1: true,
        stage2: false,
      },
      () => resolve(),
    );
  });
