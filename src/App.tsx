import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './components/header/Header'
import Home from './components/home/Home'
import LoginUser from './components/login/LoginUser'
import PrivateRoute from './components/privateRoute/PrivateRoute'
import RegisterUser from './components/register/RegisterUser'
import SingleList from './components/lists/singleList'
import { UserContextProvider } from './context/userContext'

export default function App() {

  return (
    <UserContextProvider>
      <div className='App'>
        <Header/>
        <section className='App-content'>
          <Switch>
            <Route exact path='/login' component={LoginUser} />
            <Route exact path='/register' component={RegisterUser} />
            <PrivateRoute exact path='/list' component={SingleList} />
            <PrivateRoute exact path={['/', '/home']} component={Home} />
          </Switch>
        </section>
      </div>
    </UserContextProvider>
  )
}
