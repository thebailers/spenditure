import { db } from '../../firebase';

export const RECEIVE_HOUSEHOLD = 'RECEIVE_HOUSEHOLD';

export const getHouseholdById = id => {
  if (!id) return null;
  return db.collection('households').doc(id);
};

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

export const fetchHouseholdId = uid => async dispatch => {
  const householdId = await getUsersHouseholdByUserId(uid);
  if (householdId) dispatch(receiveHousehold(householdId));
  else dispatch(receiveHousehold(null));
};
