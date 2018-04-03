import { database } from '../../firebase';

export const RECEIVE_HOUSEHOLD = 'RECEIVE_HOUSEHOLD';

export const getHouseholdById = id =>
  database
    .ref(`spenditure/users/${id}`)
    .once('value')
    .then(res => res.child('household').val());

export const receiveHousehold = householdId => ({
  type: RECEIVE_HOUSEHOLD,
  payload: householdId,
});

export const fetchHouseholdId = uid => (dispatch) => {
  const getHousehold = async () => {
    const householdId = await getHouseholdById(uid);
    if (householdId) dispatch(receiveHousehold(householdId));
  };
  getHousehold();
};
