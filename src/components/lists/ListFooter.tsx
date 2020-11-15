import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ListFooter({ addTask }: any) {
  const { handleSubmit, register } = useForm()
  const [showFormAddTask, setShowFormAddTask] = useState(false)
  const [newName, setNewName] = useState('')
  const handleFormAddTask = () => {
    setNewName('')
    setShowFormAddTask(!showFormAddTask)
  }
  const newTask = () => {
    setShowFormAddTask(false)
    if (newName === '') return
    addTask({newName})
  }

  return (
    <>
      <div className={showFormAddTask ? '' : 'd-none'}>
        <form onSubmit={handleSubmit(newTask)}>
          <h5>Add task</h5>
          <div className='form-group'>
            <label className='sr-only' htmlFor='taskname'>
              Name
            </label>
            <input
              className='form-control'
              type='text'
              id='taskname'
              name='taskname'
              ref={register}
              maxLength={20}
              placeholder='Name'
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
            />
          </div>
          <div className='d-flex'>
            <button
              className='align-self-center btn btn-link'
              onClick={handleFormAddTask}
            >
              Dismiss
            </button>
            <button className='btn btn-success ml-auto'>Create task</button>
          </div>
        </form>
      </div>
      <div className={showFormAddTask ? 'd-none' : 'text-center'}>
        <button className='btn btn-primary' onClick={handleFormAddTask}>
          Add task +
        </button>
      </div>
    </>
  )
}
