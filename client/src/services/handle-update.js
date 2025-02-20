import fetchAPI from '../utils/fetch'
import { userLoginOrUpdate } from '../features/user'
import { tokenInStorage } from '../utils/token-storage'

export function handleUpdate(e, firstName, lastName) {
  return async (dispatch, getState) => {
    e.preventDefault()

    const updateRequest = new Request(
      'http://localhost:3001/api/v1/user/profile',
      {
        method: 'PUT',
        // prettier-ignore
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${tokenInStorage()}`
          },
        body: JSON.stringify({ firstName: firstName, lastName: lastName }),
      }
    )
    const profileData = await fetchAPI(
      updateRequest,
      'update',
      dispatch,
      getState
    )

    if (getState().error.hasError) {
      return
    }

    const newFirstName = profileData.body.firstName
    const newLastName = profileData.body.lastName
    dispatch(userLoginOrUpdate(newFirstName, newLastName))
  }
}
