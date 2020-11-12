import { API_URL } from "../shared/constants";

export default async function addTaskService(params: any) {
  if (!params) {
    return
  }
  const url = API_URL + '/addTask'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
  
  
  return response.json
}
