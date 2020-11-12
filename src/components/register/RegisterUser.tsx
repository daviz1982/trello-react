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
          <button disabled={isSubmitting}>Register</button>
        </div>
      </form>
    </>
  )
}
