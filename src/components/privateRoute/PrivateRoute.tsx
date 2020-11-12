import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function PrivateRoute({ isLoggedIn, ...props }:{[key:string]:any}) {
  return isLoggedIn ? <Route {...props} /> : <Redirect to='/login' />
}
