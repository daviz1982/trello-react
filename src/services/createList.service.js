import {
  API_URL
} from "../shared/constants";

export default async function createList(listName) {
  if (!listName) return
  const url = API_URL + '/list'
  const jwt = localStorage.getItem('user') || ''
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt
    },
    body: JSON.stringify({
      name: listName
    })
  }).then(res => {
    if (!res.ok) console.error('Cannot get lists')
    return res.json()
    // return res.json()
  })
  return response
}