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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            name='username'
            id='username'
            maxLength={20}
            ref={register}
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            id='password'
            maxLength={20}
            ref={register}
          />
        </div>
        <div>
          <button disabled={isLoginLoading}>Login</button>
        </div>
        {hasLoginError && <div className='error'>Wrong credentials</div>}
      </form>
      <h4>
        Not an user yet? You can register <a href='/register'>here</a>
      </h4>
    </>
  )
}
