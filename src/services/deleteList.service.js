import {
  API_URL
} from "../shared/constants";

export default async function deleteList(idList) {
  const url = API_URL + '/list/' + idList
  const jwt = localStorage.getItem('user') || ''
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt
    }
  }).then(res => {
    if (!res.ok) console.error('Cannot get tasks')
    return res.json()
  }).catch(error => {
    console.error(`Error in deleteListService: ${error}`)
    //return []
  })
  // return response
}