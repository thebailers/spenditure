import axios from 'axios'
// import household from './reducer'

const uniqid = require('uniqid')

export const RECEIVE_HOUSEHOLD = 'RECEIVE_HOUSEHOLD'

export const getHouseholdById = (id) => {
  if (!id) return null
  console.log(id)
}

export const getUsersHouseholdByUserId = id => axios.get(`/user/${id}/household`)

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
  axios.post('/households/create', { id: userId, householdId })

export const setHouseholdForUser = (userId, household) => dispatch =>
  axios.put(`/users/update/${userId}`, household)

export const addHousehold = userId => (dispatch) => {
  const householdId = uniqid.time()

  return Promise.all([
    setHouseholdForUser(userId, householdId),
    setHousehold(userId, householdId)(dispatch),
  ])
}

// Check whether or not the user with the current userId has a household generated or not.
export const createHousehold = userId => dispatch =>
  new Promise(async (resolve, reject) => {
    const hasHousehold = await getUsersHouseholdByUserId(userId)
    // if (hasHousehold) {
    //   return reject(new Error('You have already generated a household. Please complete
    //   the setup steps.'))
    // }
    // return resolve(dispatch(addHousehold(userId)))
  })

/*
  Create household

  1. Check the current user with the userId doesn't have a household
    a. Does - return error - has household and handle on the frontend (update redux? query hh and display?)
    b. Doesn't - dispatch addHousehold

  2. Add household: Promise all.
    a. Dispatch setHousehold with userId and householdId
      - Create the household rexord in the households collection. A uniq id and users array with the userId
    b. Dispatch setHouseholdForUser to add the uniq id to the users collection. user: { household: id }

  3. Filter results through reducers into redux store

*/
