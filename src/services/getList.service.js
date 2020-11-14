import { API_URL } from "../shared/constants";

export default async function getList(idList) {
  const url = API_URL + '/list/' + idList
  const jwt = localStorage.getItem('user') || ''
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt
    }
  }).then(res => {
    if (!res.ok) console.error(`Cannot get list with id = ${idList}`)
    return res.json()
  })
  return response
}