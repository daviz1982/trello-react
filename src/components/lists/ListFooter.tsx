import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import addTask from '../../services/addTask.service'
import getTasksList from '../../services/getTasks.service'

export default function ListFooter({ idList, setTasksList }: any) {
  const { handleSubmit, register } = useForm()
  const [showFormAddTask, setShowFormAddTask] = useState(false)
  const handleFormAddTask = () => {
    setShowFormAddTask(!showFormAddTask)
  }
  const newTask = (params: any) => {
    const { taskname } = params
    if (taskname === '') return
    addTask({ task: taskname, idlist: idList })
      .then((res) => {
        if (res) {
          // getAllTasks()
          getTasksList(idList).then((tasks) => {
            setTasksList(tasks)
          })
        }
      })
      .catch((e) => {
        // console.error('Ola soy un error: ', e)
      })
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
