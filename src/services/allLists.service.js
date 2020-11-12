import { API_URL } from "../shared/constants";

export default async function getAllLists() {
  const url = API_URL + '/lists'
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
  })
  return response
}