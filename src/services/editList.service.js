import {
  API_URL
} from "../shared/constants";

export default async function editList({idList, name}) {
  const url = API_URL + '/list/' + idList
  const jwt = localStorage.getItem('user') || ''
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt
    },
    body: JSON.stringify({
      name
    })
  }).then(res => {
    if (!res.ok) console.error('Cannot get tasks')
    return res.json()
  }).catch(error => {
    console.error(`Error in getTasksService: ${error}`)
    return []
  })
  return response
}