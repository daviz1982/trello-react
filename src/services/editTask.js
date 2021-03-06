import {
  API_URL
} from "../shared/constants";

export default async function editTask({
  taskId,
  taskName
}) {
  const url = API_URL + '/tasks/' + taskId
  const jwt = localStorage.getItem('user') || ''
  const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      },
      body: JSON.stringify({
        task: taskName
      })
    }).then(res => {
      if (!res.ok) console.error(`Cannot get tasks`)
      return res.json()
    })
    .catch(error => console.error(`Error editTask: ${error}`))
  return response
}