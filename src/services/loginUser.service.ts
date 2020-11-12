import { API_URL } from "../shared/constants";

export default async function loginUserService(params: { username: string, password: string }) {
  if (!params.username || !params.password) {
    return
  }
  const url = API_URL + '/users/login'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
  return response.text()
}