export const RECEIVE_HOUSEHOLD = 'RECEIVE_HOUSEHOLD';

export const receiveHousehold = householdId => ({
  type: RECEIVE_HOUSEHOLD,
  payload: householdId,
});
