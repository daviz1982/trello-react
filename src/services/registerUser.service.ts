import { API_URL } from "../shared/constants";

export default async function registerUserService(params: { username: string, password: string }) {
  if (!params.username || !params.password) {
    return
  }
  const url = API_URL + '/users'
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
    .then(resp => resp.json())
    .then(data => {
      if(data.id && data.username) {
        if (data.username === params.username) {
          return true
        }
        return false
      }
    })
    .catch(e => {
      console.error(e)
    })



  // return response.json
}
