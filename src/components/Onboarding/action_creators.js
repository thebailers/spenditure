import uniqid from 'uniqid';
import { db } from '../../firebase';

import {
  getUsersHouseholdByUserId,
  getHouseholdById,
  receiveHousehold,
} from '../Household/action_creators';

export const FETCH_ONBOARD_STATUS = 'FETCH_ONBOARD_STATUS';
export const REQUEST_ERROR = 'REQUEST_ERROR';

const requestError = error => ({ type: REQUEST_ERROR, payload: error });

const receiveOnboardedStatus = onboarded => ({
  type: FETCH_ONBOARD_STATUS,
  payload: onboarded,
});

export const fetchOnboardedStatus = userId => dispatch =>
  db
    .collection('users')
    .doc(userId)
    .get()
    .then(
      res => dispatch(receiveOnboardedStatus(res.get('onboarded'))),
      err => dispatch(requestError(err)),
    );

const setHousehold = (uid, householdId) =>
  new Promise((resolve, reject) => {
    db
      .collection('households')
      .doc(`${householdId}/users`)
      .set(uid, { merge: true })
      .then(() => {
        resolve();
      })
      .catch(() => reject());
  });

const setUser = (uid, householdId) => dispatch =>
  new Promise((resolve, reject) => {
    db
      .collection('users')
      .doc(uid)
      .update({
        household: householdId,
      })
      .then(
        () => resolve(dispatch(receiveHousehold(householdId))),
        err => console.error(err),
      );
  });

const createHousehold = user => dispatch => {
  const { uid } = user;
  const householdId = uniqid.time();

  return Promise.all([
    setHousehold(uid, householdId),
    setUser(uid, householdId)(dispatch),
  ]);
};

export const addHousehold = user => dispatch =>
  new Promise(async (resolve, reject) => {
    const hasHousehold = await getUsersHouseholdByUserId(user.uid);
    if (hasHousehold) {
      return reject(
        new Error(
          'You have already generated a household. Please complete the setup steps.',
        ),
      );
    }
    return resolve(dispatch(createHousehold(user)));
  });

export const joinHousehold = (household, userId) => dispatch =>
  new Promise(async (resolve, reject) => {
    console.log(`household: ${household}`);
    console.log(`userId: ${userId}`);

    const householdExists = await getHouseholdById(household);
    console.log(householdExists);

    // Reject if no household id is supplied
    if (!household) reject(new Error('Please supply a household code'));

    if (householdExists) {
      // implement promise all, to dispatch save user to households and save household to user/household
      //saveUserToHousehold(household, userId);
      //resolve();
      return Promise.all([
        setHousehold(userId, household),
        setUser(userId, household)(dispatch),
      ]);
    }
    return reject(
      new Error(
        'Sorry, no household exists with this id, or you do not have access to this household.',
      ),
    );
  });

const saveUserToHousehold = (household, userId) =>
  new Promise((resolve, reject) => {
    db.ref(`spenditure/households/${household}/users`).update({
      users: [...userId],
    });
  });

export const addOnboardingStages = userid => dispatch =>
  new Promise((resolve, reject) => {
    db.ref(`spenditure/users/${userid}/onboardedStages`).update(
      {
        stage1: true,
        stage2: false,
      },
      () => resolve(),
    );
  });
