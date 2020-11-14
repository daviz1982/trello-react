import {
  API_URL
} from "../shared/constants";

export default async function editTask({
  idTask,
  name
}) {
  const url = API_URL + '/tasks/' + idTask
  const jwt = localStorage.getItem('user') || ''
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt
    },
    body: JSON.stringify({
      task: name
    })
  }).then(res => {
    if (!res.ok) console.error('Cannot get tasks')
    return res.json()
  })
  // return response
}