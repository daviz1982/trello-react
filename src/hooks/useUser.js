import { useCallback, useContext, useState } from 'react'
import Context from '../context/userContext'
import loginUserService from '../services/loginUser.service'

export default function useUser () {
  const { jwt, setJwt } = useContext(Context)
  const [state, setState] = useState({ loading: false, error: false })

  const login = useCallback(
    ({ username, password }) => {
      setState({ loading: true, error: false })
      loginUserService({ username, password })
        .then((jwt) => {
          localStorage.setItem('user', jwt)
          setState({ loading: false, error: false })
          setJwt(jwt)
        })
        .catch((err) => {
          localStorage.removeItem('user')
          setState({ loading: false, error: true })
          console.error(err)
        })
    },
    [setJwt]
  )

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    setJwt(null)
  }, [setJwt])

  return {
    isLogged: Boolean(jwt),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout
  }
}
