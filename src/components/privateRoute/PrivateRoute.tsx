import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import useUser from '../../hooks/useUser'

export default function PrivateRoute(props :any) {
  const {isLogged} = useUser()
  return (
    isLogged ? <Route {...props} /> : <Redirect to='/login' />
  )
}
