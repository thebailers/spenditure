import axios from 'axios'
import household from './reducer'

const uniqid = require('uniqid')

export const RECEIVE_HOUSEHOLD = 'RECEIVE_HOUSEHOLD'

export const getHouseholdById = (id) => {
  if (!id) return null
  console.log(id)
}

export const getUsersHouseholdByUserId = id => console.log(id)

export const receiveHousehold = householdId => ({
  type: RECEIVE_HOUSEHOLD,
  payload: householdId,
})

export const fetchHouseholdId = uid => async (dispatch) => {
  const householdId = await getUsersHouseholdByUserId(uid)
  if (householdId) dispatch(receiveHousehold(householdId))
  else dispatch(receiveHousehold(null))
}

export const setHousehold = (userId, householdId) => dispatch =>
  axios.post('/households/create', userId, householdId)

export const addHousehold = userId => (dispatch) => {
  const householdId = uniqid.time()

  return Promise.all([
    setHousehold(userId, householdId),
    // setUser(userId, householdId)(dispatch)
  ])
}

// Check whether or not the user with the current userId has a household generated or not.
export const createHousehold = userId => (dispatch) => {
  const householdId = uniqid.time()
  axios.post('/households/create', { id: userId, householdId })
}
// new Promise(async (resolve, reject) => {
//   // const hasHousehold = await getUsersHouseholdByUserId(userId)
//   const hasHousehold = false
//   if (hasHousehold) return reject(new Error('You have already generated a household. Please complete the setup steps.'))
//   return resolve(dispatch(addHousehold(userId)));
// })

export const setHouseholdForUser = (userId, household) => dispatch =>
  axios.put(`/users/update/${userId}`, household)
