import uniqid from 'uniqid'

import {
  getUsersHouseholdByUserId,
  getHouseholdById,
  receiveHousehold,
} from '../Household/action_creators'

export const FETCH_ONBOARD_STATUS = 'FETCH_ONBOARD_STATUS'
export const REQUEST_ERROR = 'REQUEST_ERROR'

const requestError = error => ({ type: REQUEST_ERROR, payload: error })

const receiveOnboardedStatus = onboarded => ({
  type: FETCH_ONBOARD_STATUS,
  payload: onboarded,
})

export const fetchOnboardedStatus = userId => dispatch => console.log(userId)

const setHousehold = (uid, householdId) =>
  new Promise((resolve, reject) => {
    // save the householdId to the users collection
    console.log(`uid: ${uid}`)
    console.log(`householdId: ${householdId}`)
    resolve()
  })

const setUser = (uid, householdId) => dispatch =>
  new Promise((resolve, reject) => {
    reject(new Error('nowt setup in setUser in Onboarding action creator'))
  })

const createHousehold = user => (dispatch) => {
  const { uid } = user
  const householdId = uniqid.time()

  return Promise.all([setHousehold(uid, householdId), setUser(uid, householdId)(dispatch)])
}

export const addHousehold = user => dispatch =>
  new Promise(async (resolve, reject) => {
    const hasHousehold = await getUsersHouseholdByUserId(user.uid)
    if (hasHousehold) {
      return reject(new Error('You have already generated a household. Please complete the setup steps.'))
    }
    return resolve(dispatch(createHousehold(user)))
  })

export const joinHousehold = (household, userId) => dispatch =>
  new Promise(async (resolve, reject) => {
    const householdExists = await getHouseholdById(household)
    console.log(householdExists)

    // Reject if no household id is supplied
    if (!household) reject(new Error('Please supply a household code'))

    if (householdExists) {
      console.log('household exists')
      // implement promise all, to dispatch save user to households and save household to user/household
      // saveUserToHousehold(household, userId);
      // resolve();

      return Promise.all([setHousehold(userId, household), setUser(userId, household)(dispatch)])
    }
    return reject(new Error('Sorry, no household exists with this id, or you do not have access to this household.'))
  })

const saveUserToHousehold = (household, userId) =>
  new Promise((resolve, reject) => reject(new Error('Save user to household not set up')))

export const addOnboardingStages = userid => dispatch =>
  new Promise((resolve, reject) => reject(new Error('add onboarding stages not set up')))
