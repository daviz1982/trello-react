import React, { useState } from 'react'
import registerUserService from './../../services/registerUser.service'
import { useForm } from 'react-hook-form'

export default function RegisterUser() {
  const { handleSubmit, register, errors } = useForm()
  const [registered, setRegistered] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = (params: any) => {
    setIsSubmitting(true)
    registerUserService(params).then(() => {
      setRegistered(true)
      setIsSubmitting(false)
    })
  }

  if (registered) {
    return (
      <>
        <h3>You have registered successfully!</h3>
        You can go to <a href='/login'>login page</a> now.
      </>
    )
  }

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 offset-lg-3'>
            <div className='card'>
              <form onSubmit={handleSubmit(onSubmit)} className='box'>
                <h2>Register</h2>
                <input
                  type='text'
                  name='username'
                  id='username'
                  ref={register}
                  maxLength={20}
                  placeholder='What&apos;s your name?'
                />
                <input
                  type='password'
                  name='password'
                  id='password'
                  ref={register}
                  maxLength={20}
                  placeholder='Write a password'
                />
                <input
                  type='password'
                  name='password2'
                  id='password2'
                  maxLength={20}
                  placeholder='Repeat your password, please :)'
                />
                <input
                  type='submit'
                  disabled={isSubmitting}
                  name='register'
                  value='Register'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
