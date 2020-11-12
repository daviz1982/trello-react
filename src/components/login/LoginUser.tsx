import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import loginUserService from '../../services/loginUser.service'

export default function LoginUser() {
  const { handleSubmit, register, errors } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const { isLoginLoading, hasLoginError, login, isLogged } = useUser()

  useEffect(() => {
    setIsSubmitting(false)
    if (isLogged) {
      setRedirect(true)
    }
  }, [isLogged])

  const onSubmit = (params: any) => {
    setIsSubmitting(true)
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
          <button disabled={isSubmitting}>Login</button>
        </div>
      </form>
      <h4>
        Not an user yet? You can register <a href='/register'>here</a>
      </h4>
    </>
  )
}
