import axios from 'axios';
export const RECEIVE_HOUSEHOLD = 'RECEIVE_HOUSEHOLD';

export const getHouseholdById = id => {
  if (!id) return null;
  console.log(id)
};

export const getUsersHouseholdByUserId = id =>
  console.log(id)

export const receiveHousehold = householdId => ({
  type: RECEIVE_HOUSEHOLD,
  payload: householdId,
});

export const fetchHouseholdId = uid => async dispatch => {
  const householdId = await getUsersHouseholdByUserId(uid);
  if (householdId) dispatch(receiveHousehold(householdId));
  else dispatch(receiveHousehold(null));
};

export const createHousehold = userId => dispatch =>
  axios.post('/api/households', userId);