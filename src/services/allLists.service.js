import { API_URL } from "../shared/constants";

export default async function getAllLists() {
  const url = API_URL + '/list'
  const jwt = localStorage.getItem('user') || ''
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt
    }
  }).then(res => {
    if (!res.ok) console.error('Cannot get lists')
    return res.json()
  }).catch(error => {
    console.error(`Error in getAllListsService: ${error}`)
    //return []
  })
  return response
}