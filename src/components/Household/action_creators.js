import { db } from '../../firebase';

export const RECEIVE_HOUSEHOLD = 'RECEIVE_HOUSEHOLD';

export const getHouseholdById = id =>
  db
    .ref(`spenditure/households`)
    .once('value')
    .then(res => res.child(id).val());

export const getUsersHouseholdByUserId = id =>
  db
    .collection('users')
    .doc(id)
    .get()
    .then(res => res.get('household'));

export const receiveHousehold = householdId => ({
  type: RECEIVE_HOUSEHOLD,
  payload: householdId,
});

export const fetchHouseholdId = uid => dispatch => {
  const getHousehold = async () => {
    const householdId = await getUsersHouseholdByUserId(uid);
    if (householdId) dispatch(receiveHousehold(householdId));
  };
  getHousehold();
};
