import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'
import useUser from '../../hooks/useUser'

export default function LoginUser() {
  const { handleSubmit, register, errors } = useForm()
  const [redirect, setRedirect] = useState(false)
  const { isLoginLoading, hasLoginError, login, isLogged } = useUser()

  useEffect(() => {
    if (isLogged) {
      setRedirect(true)
    }
  }, [isLogged])

  useEffect(() => {
    if (hasLoginError) {
      setRedirect(false)
    }
  }, [hasLoginError])

  const onSubmit = (params: any) => {
    login(params)
  }

  return (
    <>
      {redirect && <Redirect to='/home' />}
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 offset-lg-3'>
            <div className='card'>
              <form className='box' onSubmit={handleSubmit(onSubmit)}>
                <h2>Login</h2>
                <p className='text-muted'>
                  Please enter your login and password!
                </p>
                <input
                  type='text'
                  name='username'
                  id='username'
                  ref={register}
                  maxLength={20}
                  placeholder='Username'
                />
                <input
                  type='password'
                  name='password'
                  id='password'
                  ref={register}
                  maxLength={20}
                  placeholder='Password'
                />
                <a className='forgot text-muted' href='/register'>
                Not an user yet? Please, register here
                </a>
                <input
                  type='submit'
                  disabled={isLoginLoading}
                  name='login'
                  value='Login'
                />
                {hasLoginError && (
                  <div className='error'>Wrong credentials</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
